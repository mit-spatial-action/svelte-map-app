<script>
    import Tabs from '$lib/components/InfoPanel/Tabs.svelte';
    import Card from '$lib/components/InfoPanel/Card.svelte';
    import { slide } from 'svelte/transition';
    export let data;

    let pov_rat_text;
    $: if (data?.pov_rat_hi === 1) {
        pov_rat_text = `The containing census tract's 2016-2020 poverty rate of <code>${data.pov_rat.toFixed(2)}%</code> was greater than <code>20%</code>.`
    } else if (data?.pov_rat > 0) {
        pov_rat_text = `The containing census tract's 2016-2020 poverty rate of <code>${data.pov_rat.toFixed(2)}%</code> was less than <code>20%</code>.`
    } else {
        `The containing census tract's 2016-2020 poverty rate was less than <code>20%</code>.`
    }

    let inc_rat_text;
    $: regionname = (data?.regiontype === "state") ? data.regiontype : data?.name_msa;
    $: if (data?.inc_rat_lo === 1) {
        inc_rat_text = `The containing census tract's 2016-2020 Median Family Income of <code>$${data.mfi.toLocaleString()}</code> was less than 80% of the ${regionname} MFI (<code>$${data.mfi_region.toLocaleString()}</code>).`
    } else if (data?.mfi > 0) {
        inc_rat_text = `The containing census tract's 2016-2020 Median Family Income of <code>$${data.mfi.toLocaleString()}</code> was greater than 80% of the ${regionname} MFI (<code>$${data.mfi_region.toLocaleString()}</code>).`
    } else {
        inc_rat_text = `The containing census tract's 2016-2020 Median Family Income of was greater than 80% of the regional MFI.`
    }
    
    let tribal_text;
    $: if (data?.name_long !== "" && data?.name_long !== undefined) {
        tribal_text = `This site is located on U.S. Government-recognized Native Land, specificially, <code>${data.name_long}</code>.`
    } else {
        tribal_text = `This site is not located on U.S. Government-recognized Native Land.`
    }
    
    $: status = (data?.li_native === 1) ? true : false;
    $: priority = (data?.adder === 1) ? true : false;
    
    $: items = [
            {
                desc: "Poverty Rate",
                true: (data?.pov_rat_hi === 1) ? true : false,
                text: pov_rat_text,
                citation: 'U.S. Census Bureau. 2016-2020. "Poverty Status by Sex by Age (Table B17001)." <em>American Community Survey 5-Year Estimates</em>. Downloaded using the <code>tidycensus</code> R package.'
            },
            {
                desc: "Median Family Income",
                true: (data?.inc_rat_lo === 1) ? true : false,
                text: inc_rat_text,
                citation: 'U.S. Census Bureau. 2016-2020. "Median Family Income (Table B19113)." <em>American Community Survey 5-Year Estimates</em>. Downloaded using the <code>tidycensus</code> R package.'
            },
            {
                desc: "Recognized Native Land",
                true: (data?.name_long !== "" && data?.name_long !== undefined) ? true : false,
                text: tribal_text,
                citation: 'U.S. Census Bureau. 2020. <em>American Indian/Alaska Native/Native Hawaiian Areas</em>. Downloaded using the <code>tigris</code> R package.'
            },
        ]

        let pp_text;
        $: if (data?.pp === 1) {
            pp_text = `At least <code>20%</code> of <code>${data.cty_name} County's</code> population was living in poverty for approximately thirty years after 1980.`
        } else {
            pp_text = `This site is not in a persistent poverty county.`
        }
        const nth = (number) => {
            let strNum = String(number);
            if (number > 3 && number < 21) return strNum.concat("th");
            switch (number % 10) {
                case 1:
                return strNum.concat("st");
                case 2:
                return strNum.concat("nd");
                case 3:
                return strNum.concat("rd");
                default:
                return strNum.concat("th");
            }
        };

        let nrg_disadv_text;
        $: if (data?.nrg_disadv === 1) {
            nrg_disadv_text = `The containing census tract's energy costs are in the <code>${nth(data.nrg_burd_p)}</code> percentile. Its PM2.5 exposure is in the <code>${nth(data.pm25_p)}</code> percentile. Its low-income population is in the <code>${nth(data.pov_p * 100)}</code> percentile.`
        } else {
            nrg_disadv_text = `This site is not in an energy disadvantaged census tract.`
        }
        $: priorityItems = [
            {
                desc: "Persistent Poverty",
                true: (data?.pp === 1) ? true : false,
                text: pp_text,
                citation: 'U.S. Department of Agriculture Economic Research Service. 2023. <em><a href="https://www.ers.usda.gov/data-products/poverty-area-measures/">Poverty Area Measures</a></em>.'
            },
            {
                desc: "Energy Disadvantage",
                true: (data?.nrg_disadv === 1) ? true : false,
                text: nrg_disadv_text,
                citation: 'Council on Environmental Quality. 2022. <a href="https://screeningtool.geoplatform.gov/en/downloads">"Data Downloads."</a> <em>Climate and Economic Justice Screening Tool</em>.  Nov 22.'

            }
        ]
</script>

<Card {status} {priority} title="Low-Income Community or Native Land">
    <Tabs {items}>
        {#if priority}
        <div transition:slide = {{ duration: 400}} class="block box has-background-primary">
            <p class="subtitle has-text-white">Priority Criteria</p>
            <Tabs items={priorityItems}>
            </Tabs>
        </div>
        {/if}
    </Tabs>
</Card>