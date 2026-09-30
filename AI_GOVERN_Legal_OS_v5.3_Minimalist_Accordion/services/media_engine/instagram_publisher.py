import os, json, urllib.parse, urllib.request

class InstagramReelsPublisher:
    def __init__(self, ig_user_id: str = None, access_token: str = None):
        self.ig_user_id = ig_user_id or os.getenv("INSTAGRAM_USER_ID", "")
        self.access_token = access_token or os.getenv("META_PAGE_ACCESS_TOKEN", "")
        self.graph_base = "https://graph.facebook.com/v19.0"

    def publish_reel(self, public_video_url: str, caption: str) -> dict:
        if not self.ig_user_id or not self.access_token:
            return {
                "status": "ready_to_publish",
                "message": "Reel renderizado e indexado. Configure META_PAGE_ACCESS_TOKEN en producción para despacho directo a Instagram Graph API.",
                "caption": caption,
                "video_url": public_video_url
            }

        container_url = f"{self.graph_base}/{self.ig_user_id}/media"
        payload = {
            "media_type": "REELS",
            "video_url": public_video_url,
            "caption": caption,
            "share_to_feed": "true",
            "access_token": self.access_token
        }
        data = urllib.parse.urlencode(payload).encode("utf-8")
        req = urllib.request.Request(container_url, data=data)
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode("utf-8"))
