# # import scrapy
# import json


# class LinkedInJobsSpider(scrapy.Spider):
#     name = 'linkedin_jobs'
#     allowed_domains = ['linkedin.com']
#     start_urls = ['https://www.linkedin.com/jobs/search/?currentJobId=3458212508&f_F=dsgn%2Cit&f_I=6%2C4&f_T=25170%2C3172%2C2105%2C346%2C25194%2C24%2C39%2C25201&keywords=D%C3%A9veloppement%20web&refresh=true&sortBy=R']

#     def parse(self, response):
#         jobs = response.xpath('//li[contains(@class,"result-card")]')

#         for job in jobs:
#             company_name = job.css(
#                 '.result-card__subtitle > .result-card__subtitle-link::text').get()
#             job_title = job.css('.result-card__title::text').get()
#             job_location = job.css('.job-result-card__location::text').get()
#             job_posted_date = job.css('.job-result-card__listdate::text').get()

#             yield {
#                 'company_name': company_name.strip() if company_name else None,
#                 'job_title': job_title.strip() if job_title else None,
#                 'job_location': job_location.strip() if job_location else None,
#                 'job_posted_date': job_posted_date.strip() if job_posted_date else None
#             }

#         # Write the extracted data to a JSON file
#         filename = 'linkedin_jobs.json'
#         with open(filename, 'w', encoding='utf-8') as f:
#             json.dump(list(jobs), f, ensure_ascii=False, indent=4)
