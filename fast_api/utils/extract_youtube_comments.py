from youtube_comment_downloader import YoutubeCommentDownloader

def extract_comments(video_url: str, limit: int = 20) -> list[str]:
    print(f"🟡 Intentando extraer comentarios de: {video_url}")
    
    try:
        limit = int(limit)
        downloader = YoutubeCommentDownloader()
        comments = []

        for comment in downloader.get_comments_from_url(video_url):
            text = comment.get("text", "")
            if text:
                comments.append(text)
            if len(comments) >= limit:
                break

        print(f"✅ Comentarios extraídos: {len(comments)}")
        return comments

    except Exception as e:
        print(f"❌ Error real durante scraping: {e}")
        raise Exception(f"Error extracting comments: {e}")
