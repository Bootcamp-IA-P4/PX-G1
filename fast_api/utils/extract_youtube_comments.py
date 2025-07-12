from youtube_comment_downloader import YoutubeCommentDownloader
from langdetect import detect
from deep_translator import GoogleTranslator
import logging
from logs.setup_loggers import setup_logging

setup_logging()

def extract_comments(video_url: str, limit: int = 20) -> list[str]:
    logging.info(f"🟡 Intentando extraer comentarios de: {video_url}")
    
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
        logging.error(f"❌ Error durante el scraping de comentarios: {e}")
        raise Exception(f"Error extracting comments: {e}")
    
def translate_if_needed(text: str, target_lang="en") -> str:
    try:
        detected_lang = detect(text)
        if detected_lang != target_lang:
            translated = GoogleTranslator(source='auto', target=target_lang).translate(text)
            return translated
        else:
            return text
    except Exception as e:
        logging.warning(f"⚠️ Error detectando o traduciendo texto: {e}")
        return text
