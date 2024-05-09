import datetime
import json
import os
import sys
from pathlib import Path

import github
import pymongo
from bson import json_util


MONGODB_URI = os.getenv("MONGODB_URI")
if not MONGODB_URI:
    raise ValueError("Not have MongoDB URI")

GITHUB_TOKEN = os.environ.get("GH_PAT")
if not GITHUB_TOKEN:
    raise ValueError("GITHUB_TOKEN not defined.")

GITHUB_REPO_NAME = "Surfscript/upvoice-main"

mongo_cluster = pymongo.MongoClient(MONGODB_URI)
db = mongo_cluster['upvoice_db']['github_cicd_preview']


def get_available_app(pr_number: str):
    doc = db.find_one({"github_pr_number": pr_number})
    if not doc:
        doc = db.find_one({"is_available": 1})

    if not doc:
        raise ValueError("Not have any available shopify app")

    db.find_one_and_update(
        filter={"_id": doc['_id']},
        update={"$set": {
            "github_pr_number": pr_number,
            "is_available": 2,  # hold
            "last_modified": datetime.datetime.utcnow(),
        }},
        upsert=False
    )

    Path("shopify_app.json").write_text(json.dumps(doc, default=json_util.default))
    Path("shopify_token.txt").write_text(doc['api_key'])

    shopify_env = f"export SHOPIFY_URL={doc['app_url']}\n"
    shopify_env += f"export SHOPIFY_API_KEY={doc['api_key']}\n"
    shopify_env += f"export SHOPIFY_API_SECRET={doc['api_secret']}\n"
    shopify_env += f"export SHOPIFY_APP_NUM={doc['ordinal_number']}\n"

    Path("shopify_env.sh").write_text(shopify_env)


def set_github_preview_url(commit_sha: str):
    doc_text = Path("shopify_app.json").read_text()
    doc = json.loads(doc_text)

    db.find_one_and_update(
        filter={"_id": doc['_id']},
        update={"$set": {
            "is_available": 0,  # unavailable
            "last_modified": datetime.datetime.utcnow(),
        }},
        upsert=False
    )

    repo = github.Github(GITHUB_TOKEN).get_repo(GITHUB_REPO_NAME)
    commit = repo.get_commit(sha=commit_sha)
    commit.create_status(
        state="success",
        target_url=doc['store_url'],
        context=f"Deployment Preview for upvoice [app_title={doc['title']}]",
        description="Your preview is now available.",
    )


def release_app(pr_number: str):
    db.find_one_and_update(
        filter={"github_pr_number": pr_number},
        update={"$set": {
            "github_pr_number": "",
            "is_available": 1,  # available
            "last_modified": datetime.datetime.utcnow(),
        }},
        upsert=False
    )


if __name__ == "__main__":
    args = sys.argv

    print(args)

    args.pop(0)

    command = args[0]

    if command == 'get_app':
        get_available_app(args[1])
    elif command == 'github_deploy':
        set_github_preview_url(args[1])
    elif command == 'release_app':
        release_app(args[1])
    else:
        raise ValueError("Not valid command")

    # match only work on python 3.10
    # current cloud-sdk docker using python 3.9

    # match args[0]:
    #     case 'get_app':
    #         # args[1] == pr_number
    #         get_available_app(args[1])
    #     case 'github_deploy':
    #         # args[1] == commit sha
    #         set_github_preview_url(args[1])
    #     case other:
    #         raise ValueError("Not valid command")
