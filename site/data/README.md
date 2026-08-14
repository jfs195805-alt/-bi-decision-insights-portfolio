# Data Sources And Methodology

This portfolio uses public company financial metrics from official investor relations, annual report, or SEC filing pages.

## Dataset

File: `global_tech_financials_2024.csv`

Grain: one row per company fiscal year.

Currency: USD millions.

Companies:

- Apple
- Microsoft
- Alphabet
- Amazon
- Meta
- Netflix
- NVIDIA
- Tesla

## Metrics

| Field | Meaning |
|---|---|
| revenue_usd_m | Annual revenue / net sales in USD millions |
| net_income_usd_m | Net income in USD millions |
| rd_or_tech_usd_m | R&D or closest technology investment proxy disclosed in annual filing |
| employees | Reported employee count |

## Official Source Pages

- Apple investor filings: https://investor.apple.com/sec-filings/default.aspx
- Microsoft annual reports: https://www.microsoft.com/en-us/investor/annual-reports.aspx
- Alphabet investor relations: https://abc.xyz/investor/
- Amazon annual reports: https://ir.aboutamazon.com/annual-reports-proxies-and-shareholder-letters/default.aspx
- Meta financials: https://investor.fb.com/financials/default.aspx
- Netflix annual reports: https://ir.netflix.net/financials/annual-reports-and-proxies/default.aspx
- NVIDIA annual reports: https://investor.nvidia.com/financial-info/annual-reports-and-proxies/default.aspx
- Tesla SEC filings: https://ir.tesla.com/sec-filings

## Portfolio Use

This dataset is intentionally compact so recruiters can inspect the logic quickly. The dashboard focuses on executive BI, KPI governance, data storytelling, analytics engineering, and decision insights rather than complex data science modeling.

