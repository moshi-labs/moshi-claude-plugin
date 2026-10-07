# Meta call budget

Nine reads per run, in this order. Never one call per ad. Send the same
`client_conversation_id` on every call and `hide_ui: true` where the tool
accepts it. The report is the artifact, so Meta's own cards would repeat it.

| # | Tool | Arguments | Fields |
|---|---|---|---|
| 1 | `ads_get_ad_accounts` | — | `ad_account_id`, `currency`, `is_ads_mcp_enabled`, `is_queryable` |
| 2 | `ads_get_ad_entities` | `level: "ad_account"` | `timezone_name` |
| 3 | `ads_get_ad_entities` | `level: "campaign"`, `date_preset: "last_30d"` | `id`, `name`, `objective`, `effective_status`, `start_time`, `daily_budget`, `lifetime_budget`, `amount_spent` |
| 4 | `ads_get_ad_entities` | `level: "adset"`, `date_preset: "last_30d"` | `id`, `name`, `campaign_id`, `start_time`, `optimization_goal`, `learning_stage_info`, `attribution_setting`, `daily_budget`, `bid_strategy`, `effective_status` |
| 5 | `ads_get_ad_entities` | `level: "ad"`, `date_preset: "last_30d"`, `limit: 1000` | `id`, `name`, `adset_id`, `campaign_id`, `effective_status`, `amount_spent` |
| 6 | `ads_get_ad_entities` | `level: "ad"`, `object_ids`: Moshi ads + the merchant's top 3 ads by spend from read 5, `date_preset: "last_30d"`, `time_increment: "1"`, `limit`: ads × 31 | `amount_spent`, `impressions`, `link_click`, `results`, `omni_purchase`, `omni_purchase_values`, `frequency` |
| 7 | `ads_get_ad_entities` | `level: "ad"`, `filtering`: ad set id in the comparison launches, `time_range` from the earliest launch start to 14 days after the latest, `time_increment: "1"` | same as read 6 |
| 8 | `ads_account_get_activity_logs` | `start_time`: the first Moshi launch | all |
| 9 | `ads_insights_anomaly_signal` | — | all |

Skip read 7 when no comparison launch exists (see `comparison-method.md`).

Reads 6 and 7 can return one ad's date twice. Keep one row per ad per
date (see `data-contract.md`). `adsPulled` is `"all"` only when every ad
set's ads came from read 7 (or the campaign is Moshi's). If any ad set has
only read-6 top ads, use `"top"`.

## Reading the responses

- `ads_get_ad_entities` returns `ad_entities` as a JSON string. Parse it,
  then parse each entity.
- Money fields are `{ value, unit }`. Use `value`.
- Meta's `ctr` is a string such as `"1.47%"`. Do not copy it. The template
  computes CTR from link clicks and impressions.
- `results` is `{ indicator, values: [{ attribution_windows, value }] }`, or
  `{ indicator, value: "Not available" }`. Use it for `conversations` only
  when `indicator` is
  `actions:onsite_conversion.messaging_conversation_started_7d`.
- `learning_stage_info` is `{ attribution_windows, last_sig_edit_ts }`.
  `last_sig_edit_ts` is epoch seconds. It has no learning status, so
  `learning` stays null unless Meta returns a status elsewhere.
- The attribution window is `attribution_setting` on the ad set. Not
  `attribution_spec`, and not `learning_stage_info.attribution_windows`.
- `start_time` can be `1969-12-31` on older campaigns and ad sets. Treat
  it as null.
- With `time_increment`, `limit` counts daily rows, not ads.
- Activity log `result` is a JSON string. `datetime` reads like
  `"9/10/2026 at 2:26 PM"` (month/day/year). `extra_data` is a JSON string
  with `old_value` and `new_value`.
- Currency is not an entity field. It comes from read 1 only.

## Limits

- `ads_get_field_context` runs only when a read rejects a field. It is not
  part of the normal nine.
- If a response has `next_actions`, run only the actions with
  `read_only: true` and `requires_user_confirmation: false`, in `step`
  order, then stop.
- On a rate-limit error, stop the Meta reads. Keep what loaded, add the
  flag `meta_rate_limited`, and drop the sections that need the missing
  data. Never retry in a loop.
- Never call a tool that creates, updates, pauses or activates anything.
