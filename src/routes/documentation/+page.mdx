---
title: Documentation
description: boilerplate.
layout: titled
---
# Data Dictionary

## Low-Income Communities (`low_inc`)

| Geography  | Date |
| ---------- | ---- |
| Census Tracts (2020)  | 2016-2020 |

"Low-income communities" are defined by ["New Markets Tax Credits," Section 45D(e)(1) of IRC](https://www.federalregister.gov/d/01-31391/p-16) as...

> any population census tract if (A) the poverty rate for such tract is at least 20 percent, or (B)(i) in the case of a tract not located within a Metropolitan Area (as hereinafter defined), the median family income for such tract does not exceed 80 percent of statewide median family income, or (ii) in the case of a tract located within a Metropolitan Area, the median family income for such tract does not exceed 80 percent of the greater of statewide median family income or the Metropolitan Area median family income.

As such, we need to calculate both the tract poverty rate and the ratio of tract income to regional income. These are defined below.

### Poverty Rate

Qualifying census tracts have poverty rates of __at least 20%__. The poverty rate is defined as the [Income in the past 12 months below poverty level (`B17001_002`)](https://www.socialexplorer.com/data/ACS2020_5yr/metadata/?ds=ACS20_5yr&var=B17001002) over the [Population for whom poverty status is determined (`B17001_001`)](https://www.socialexplorer.com/data/ACS2020_5yr/metadata/?ds=ACS20_5yr&var=B17001001).

### Income Ratio

The income ratio is defined as...

<!-- $$
inc\\_ratio_t = 
\begin{cases}
  \dfrac{MFI_t}{\max(MFI_s, MFI_m)} & \text{if }\exists MFI_m,\\
  \dfrac{MFI_t}{MFI_s} & \text{otherwise}
\end{cases}
$$ -->

...where $MFI_t$ is a given tract's Median Family Income In The Past 12 Months (MFI, In 2020 Inflation-Adjusted Dollars), $MFI_s$ is the statewide MFI, and $MFI_m$ is the metropolitan statistical area-wide MFI for tracts that lie within MSAs. All are identified by the ACS variable [`B19113_001`](https://www.socialexplorer.com/data/ACS2020_5yr/metadata/?ds=ACS20_5yr&var=B19113001).

## Energy Communities

"Energy Communities" are defined for the IRA's [Energy Community Tax Credit Bonus](https://energycommunities.gov/energy-community-tax-credit-bonus/). With the exception of brownfields, these are calculated by the DoE; they are defined on the three following geographies.

### Brownfield Sites

| Geography  | Date | Source |
| ---------- | ---- | ----------- |
| Point Locations  | 2023 | [EPA](https://www.epa.gov/frs/geospatial-data-download-service) |

A “brownfield site” (as defined in certain subparagraphs of the Comprehensive Environmental Response, Compensation, and Liability Act of 1980 (CERCLA))

### Fossil Fuel Employment Communities

| Geography  | Date | Source |
| ---------- | ---- | ----------- |
| Counties  | 2022 | [NETL](https://edx.netl.doe.gov/dataset/ira-energy-community-data-layers) |

A “metropolitan statistical area” or “non-metropolitan statistical area” that has (or had at any time after 2009)... 

+ 0.17% or greater direct employment or 25% or greater local tax revenues related to the extraction, processing, transport, or storage of coal, oil, or natural gas; and
+ has an unemployment rate at or above the national average unemployment rate for the previous year

### Coal Closure Communities

| Geography  | Date | Source |
| ---------- | ---- | ----------- |
| Census Tracts (2020)  | 2022 | [NETL](https://edx.netl.doe.gov/dataset/ira-energy-community-data-layers) |

A census tract (or directly adjoining census tract) in which

+ a coal mine has closed after 1999; or
+ in which a coal-fired electric generating unit has been retired after 2009.

## Energy Disadvantage

| Geography  | Date | Source |
| ---------- | ---- | ----------- |
| Census Tract (2010)  | 2015-2019 | CEJST |

The [Climate and Economic Justice Screening Tool](https://screeningtool.geoplatform.gov/en/) identifies communities (i.e., census tracts) as energy disadvantaged if they are either...

+ At or above the 90th percentile for energy costs; or
+ At or above the 90th percentile for PM2.5 exposure

...and...

+ At or above the 65th percentile for low income.

In other words...

<!-- $$
energy\\_dis = 
\begin{cases}
  1 & (energy\\_costs >= 90^{th}\text{ \\%ile}\text{ | }pm25\\_exp >= 90^{th}\text{ \\%ile})\text{ \\& } low\\_income >= 65^{th}\text{ \\%ile}\\
  0 & \text{otherwise}
\end{cases}
$$ -->

## Persistent Poverty County

| Geography  | Date | Source |
| ---------- | ---- | ----------- |
| Counties  | 2015 | [USDA](https://www.ers.usda.gov/topics/rural-economy-population/rural-poverty-well-being/#geography) |

Persistent Poverty Counties, or PPCs, are one of the [county typologies](https://www.ers.usda.gov/data-products/county-typology-codes/) developed by the Economic Research Service of the USDA. These are defined as counties in which "20 percent or more of their populations were living in poverty based on the 1980, 1990, and 2000 decennial censuses and 2007-11 ACS 5-year estimates."

## Indian Land

"Indian Lands" are sourced from the U.S. Census's TIGER/Line "American Indian / Alaska Native / Native Hawaiian Areas" shapefile. For our purposes, we use MTFCC codes and, in limited cases, Tribal names to identify lands. Specifically, we use...

| Type | MTFCCs |
| --- | --- |
| Federal/State American Indian Reservation (AIR) or Off-Reservation Trust Land (ORTL) | G2100 |
| Federal AIR/ORTL Joint-Use Area | G2170 |
| Hawaiian Home Land (HHL) | G2120 |
| Oklahoma Tribal Statistical Area (OTSA) | G2140 |
| OTSA Joint-Use Area | G2170 |
| Alaska Native Village Statistical Area (ANVSA) | G2170 |

Given recent jurisprudence in McGirt v. Oklahoma, the OTSAs of the Cherokee, Chickasaw, Choctaw, Muscogee (Creek), and Seminole Nations are treated as identical to American Indian Reservations.