---
name: close-the-carts
description: Use when a Moshi merchant asks about abandoned carts, who almost bought, who to follow up with, their Closer queue, or wants to nudge or recover leads in bulk. Works the Closer queue of shoppers who got close to buying and went quiet — shows who's in it, drafts a nudge for each lead the merchant picks after they confirm the queue, lays every draft out for one review pass, then sends the ones they approve. Requires the Moshi MCP server.
when_to_use: Use when a Moshi merchant asks about abandoned carts, who almost bought, who to follow up with, their Closer queue, or wants to nudge or recover leads in bulk. Requires the Moshi MCP server.
---

Work the Closer queue for the organization this session is authenticated as: find the leads
worth a nudge, draft one for each lead the merchant picks, let them review the whole batch at
once, and send what they approve.

## Walk the merchant through it, in order

1. **Show the queue.** Call `get_closer_queue` (default `limit` 50). Lead with one line:
   how many leads are in it and the total open-cart value (`lastCartValue`, summed where
   present). Then list the leads, most urgent first, one line each:
   name (`displayName`, else `@username`), channel (`platform`), cart value, where it
   stalled (`abandonmentStage`), heat bucket, their last message (`lastMessagePreview`),
   and **time left** — `windowClosesAt` relative to now ("closes in 3h").

   Put any row with `repliedSinceHold: true` at the very top and say so: the merchant took
   that conversation over and the customer has written back — **a person is waiting on a
   human.** Rows with `heldByHuman: true` are conversations the merchant is already handling;
   mark them, and do not include them in a bulk draft unless the merchant asks for that lead
   by name.

   Mention the rules once, from `criteria`: leads leave the queue `windowHours` after their
   last message (that's when Meta stops delivering), a nudged lead is held back for
   `nudgeCooldownDays` days, and the org can send at most `dailyCap` nudges a day.

   If the queue is empty, say so plainly and offer `get_closer_activity` for how recent
   nudges did. Stop there.

2. **Pick the batch.** Propose the leads to draft: default to every lead that is not
   `heldByHuman`, up to **10**, ordered by time left (soonest-closing first), then cart
   value. Never propose more than `dailyCap` — anything past the cap cannot be sent today.
   Show the queue and the proposed batch in one line, and get a one-line yes from the
   merchant before drafting (drafting is a write: it generates text and logs activity); they
   can name leads to add or drop. If they ask for more than 10, do it, capped at `dailyCap`.

   Only draft leads the merchant will actually consider. Every draft runs a generation and is
   recorded as the merchant opening that lead, so do not draft the whole queue "just to see".

3. **Draft the batch.** Call `draft_closer_nudge` once per lead in the batch, omitting
   `offerContext` so each lead gets its suggested offer. Keep each lead's `draftId`, `message`,
   `suggestedIncentiveType`, `incentiveOptions` and `offerContext`. If one draft fails, note
   it against that lead and carry on with the rest — do not abandon the batch.

4. **Present everything for one review pass, then STOP.** Number the drafts. For each:
   - the lead (name, channel, cart value, time left)
   - the message, **verbatim**, in a quote block — this is exactly what the customer reads
   - the offer attached, in words ("free shipping", "10% off") and the product cards by
     **name** (call `get_closer_offer_products` for that lead if you need names; never show
     raw IDs). Say "no offer" when there is none.

   Then ask for decisions in one go, and make them cheap to give:
   - **"send all"**, **"send 1, 3, 5"**, **"skip 2"**
   - **edits** — "make 4 shorter", "drop the discount on 2", "#6: say we restocked the
     black one"
   - a different offer from that lead's `incentiveOptions`

   Review is the merchant's choice, not a gate you impose: if they said up front "just send
   them" or "draft and send", skip this stop and send the batch as drafted — but still list
   what went out afterwards (step 6).

5. **Apply edits, then send.** For a wording edit, rewrite the text yourself and show only
   the changed drafts again — not the whole batch. For an offer change, call
   `draft_closer_nudge` again for that lead with the new `offerContext` (it returns a new
   `draftId`; use that one). Once the merchant confirms, call `send_closer_nudge` for each
   approved lead with its `draftId` and the **final text** as `message`. Send one at a time,
   not in parallel. The client (e.g. ChatGPT) may also ask the merchant to confirm each send;
   that is expected, so wait for it.

   **Send exactly what they approved.** Do not re-polish wording at send time. The draft's
   offer carries into the send automatically — only pass `incentiveId`, `newOffer` or
   `cardProductIds` when the merchant changed the offer.

6. **Report back** in one compact list: sent (with any `incentiveCode` issued), skipped, and
   failed with the reason. Then name what's left: leads not in this batch, and how many
   nudges remain under `dailyCap` today. Offer the next batch if there is one.

## Hard rules — correctness, not style

1. **Never send a message the merchant did not see, unless they told you to send without
   review.** "Looks good" on the batch covers the batch as shown; a draft you edited after
   that needs another look unless the merchant asked you to make that edit.
2. **Messages go to real customers and cannot be unsent.** Say this once, when you present
   the batch.
3. **Never put a discount code in a message.** Drafts never contain one; the code is attached
   by the send. If the merchant writes one in, tell them it's attached automatically and
   take it out.
4. **A draft only sends in the session that drafted it.** If a send comes back "No matching
   draft for this lead", the session was reset: re-draft that lead, show the merchant the new
   text if they were reviewing, and send that. Do not invent or reuse a `draftId`.
5. **Respect the window and the cap.** Do not draft a lead whose `windowClosesAt` has already
   passed, and stop sending when `dailyCap` is reached — report the rest as "held for
   tomorrow", don't retry them.
6. **Do not retry a failed send.** Report the error for that lead. A retry can text the
   customer twice.

## Tone

You are talking to a merchant about their customers. Be direct: "Eight people left carts
worth $1,240 in the last day — here's who." Name people by name and carts by value, not
"leads" and "conversations" in the abstract. State a limit once ("Meta only lets us reach
them for 24 hours after their last message") and keep going.
