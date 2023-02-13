# FinTech Store

Fintech Store by Franz

## Task:
* Recreate this computer store app.  We will go over your submission during the next phase of the interview so be prepared to answer questions about your solution.
* We encourage the use of libraries and frameworks as much as you want to save time.

## Frontend Requirements:
* You must write this in a modern framework.  Your choices are: React, Angular, or Vue.js
* Match this style as close as possible.
* Search Bar:
  * 250ms debounce on keydown to query backend to provide paginated results of size 12.  

* "Showing X of Y":
  * X = currently displayed items
  * Y = total records in the data store

* "Show More":
  * When clicked, it should append the next page of results to the existing results.
  * If record has a “striked-price”, color the price red and cross out the striked-price in grey.
  * If “striked-price” is null, then color the price black.
  * The "View Deal" button doesn't do anything for the purpose of this assignment. 

## Backend Requirements:
* You must write this backend in one of the following languages: Python, JavaScript, Go, or Java.  Use of a framework is encouraged.
* Create a single REST API endpoint to support the search functionality.
* This endpoint should support pagination of page size 12 and should also include the total count of matching records for the “Showing X of Y” widget.
  * The search code should leverage your data store’s filtering/querying mechanism (ilike, scan, etc) on the description & vendor fields.  Pulling all the data and then filtering with code is not allowed.
  * Create a script that loads the provided JSON facet to load/seed your data store. Download here: Facet File link

## Data Store Requirements:
* You may choose any AWS Service to store your data (RDS, DynamoDB, ElasticSearch, OpenSearch, etc).
* Running these services in a container or on an EC2 is not allowed.

## Deployment Requirements:
* You must deploy your solution (Frontend, Backend, and Data Store) to AWS. It’s up to you on which service(s) you want to use - be prepared to explain this choice during the next stage interview.  Note: You may not use Elastic Beanstalk.
* You must deploy using a template as code framework such as Terraform, CloudFormation, or Serverless.

## Submission:
Please provide the following when you are complete with this assignment:
* URL to deployed solution.
* GitHub or other VCS link to your source code (Frontend, Backend, Deployment & Template as Code, and any other data loading scripts).
* Include a write-up of how your application is deployed and any improvements that could be made if it went to production.
