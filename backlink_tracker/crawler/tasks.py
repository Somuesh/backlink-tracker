from celery import shared_task
from .models import CrawlJob, CrawlResult
from .crawler_engine import run_crawler

@shared_task
def run_crawler_task(job_id):
    from django.db import transaction
    job = CrawlJob.objects.get(id=job_id)
    job.status = 'in_progress'
    job.save()

    try:
        urls = job.urls.split(',')
        targets = job.target_domains.split(',')
        results = run_crawler(urls, targets, job.rate_limit)

        with transaction.atomic():
            for r in results:
                CrawlResult.objects.create(
                    job=job,
                    source_url=r["source_url"],
                    source_title=r["source_title"],
                    target_url=r["target_url"],
                    rel_attr=r["rel_attr"]
                )
        job.status = 'completed'
    except Exception as e:
        job.status = 'failed'
    finally:
        job.save()
