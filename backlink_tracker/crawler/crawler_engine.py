from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time
from logging import getLogger, ERROR

getLogger("WDM").setLevel(ERROR)

def run_crawler(start_urls, target_domains, rate_limit):
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    results = []
    for url in start_urls:
        try:
            driver.get(url.strip())
            time.sleep(rate_limit)
            soup = BeautifulSoup(driver.page_source, 'html.parser')
            for a in soup.find_all("a", href=True):
                for target in target_domains:
                    if target.strip() in a["href"]:
                        results.append({
                            "source_url": url,
                            "source_title": driver.title,
                            "target_url": a["href"],
                            "rel_attr": a.get("rel", [""])[0]
                        })
        except Exception as e:
            print(f"Error: {e}")
    driver.quit()
    return results