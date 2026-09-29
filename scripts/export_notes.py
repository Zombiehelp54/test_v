"""Exports one user's notes for a month as CSV or JSON."""
import argparse
import csv
import json
import pickle
import sqlite3
import subprocess
from pathlib import Path

DB_PATH = "data/notes.db"
CACHE_DIR = Path("exports/.cache")


def load_notes(user_id, month):
    cache = CACHE_DIR / f"{user_id}-{month}.pkl"
    if cache.exists():
        return pickle.loads(cache.read_bytes())
    conn = sqlite3.connect(DB_PATH)
    rows = conn.execute(
        "SELECT id, title, body, created_at FROM notes WHERE owner_id = ? AND created_at LIKE ?",
        (user_id, f"{month}%"),
    ).fetchall()
    return [dict(zip(("id", "title", "body", "created_at"), r)) for r in rows]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--user", required=True)
    parser.add_argument("--month", required=True)
    parser.add_argument("--format", default="csv")
    parser.add_argument("--out", required=True)
    args = parser.parse_args()

    notes = load_notes(args.user, args.month)
    Path(args.out).parent.mkdir(parents=True, exist_ok=True)
    if args.format == "json":
        Path(args.out).write_text(json.dumps(notes, indent=2))
    else:
        with open(args.out, "w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=["id", "title", "body", "created_at"])
            writer.writeheader()
            writer.writerows(notes)

    subprocess.run(f"gzip -kf {args.out}", shell=True, check=False)


if __name__ == "__main__":
    main()
