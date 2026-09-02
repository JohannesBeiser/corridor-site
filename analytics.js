// Website analytics — PostHog, EU region, behind a proxy on this site's own domain.
//
// The site, not the app. Corridor itself sends nothing of the sort and this file is
// never bundled into it; it exists so I can tell whether a page on corridor-trails.com
// is doing its job. It answers four questions and no others: which countries people
// come from, which pages they read, how long they stay, and what they click.
//
// Cookies are used on purpose. PostHog's cookieless mode (`cookieless_mode: 'always'`)
// strips GeoIP and disables session replay, which is three of those four questions
// gone, so the trade was made the other way and the privacy policy says so plainly.
//
// The key below is a *public* project token. It is write-only by design — it can post
// events and it cannot read a single one back — so it belongs in a static file that
// every visitor downloads. It is not a secret and must not be treated as one.

!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

posthog.init('phc_CzCNi5dYMrJR52jnA9vC7pwEeRd3R6teHSvBWQ6S6qXF', {
  // A subdomain of this site, not PostHog's own host, and the reason is measurable:
  // EasyPrivacy blocks `||i.posthog.com/static/array.js` and `||i.posthog.com/i/`
  // outright, which was 100% of the events on the first day and is 10-25% of any real
  // audience. Pointed straight at eu.i.posthog.com this file loaded fine and the SDK
  // bundle it asks for came back ERR_BLOCKED_BY_CLIENT. e.corridor-trails.com is
  // PostHog's own managed proxy, free on every cloud plan, a CNAME at Namecheap, and
  // Cloudflare in front of it. The name is deliberately not `analytics.` or `tracking.`,
  // which are blocked by name.
  //
  // The loader above derives the bundle URL from this value by string replacement, so
  // both the events and array.js come from this domain and no blocklist has a rule for it.
  api_host: 'https://e.corridor-trails.com',

  // Where the dashboards live. The proxy serves ingest, not the app, so links out of the
  // toolbar need the real host or they go nowhere.
  ui_host: 'https://eu.posthog.com',

  // A dated snapshot of PostHog's own defaults. Pinning it means a future release
  // cannot quietly change what this site captures; raising it is a deliberate edit.
  defaults: '2026-05-30',

  // Nobody signs in here, so there is no person to profile. Anonymous events still
  // carry country, session and every click — they simply cost less and store less.
  person_profiles: 'identified_only',

  // The click map and the scroll map. On by default in current releases; written out
  // because it is one of the four questions this file exists to answer.
  capture_heatmaps: true,

  // Time on page. Without the leave event a visit has a start and no end.
  capture_pageview: true,
  capture_pageleave: true,

  // A browser that asks not to be tracked is not tracked. It costs a percent or two of
  // the numbers and it is the same answer this project gives everywhere else.
  respect_dnt: true,
});

// Not counting the author, which on the first day was nine of the nine people the site
// had ever seen: two browsers, several private windows, a blocker toggled on and off, and
// two networks that geolocated to two different cities. One human, nine cookies.
//
// Visit corridor-trails.com/?ph=off once in each browser and on the phone and this browser
// stops sending, for good - PostHog writes the opt-out into local storage, so it survives
// a restart and every later visit. ?ph=on undoes it. Clearing site data also undoes it,
// which is worth knowing before concluding the numbers are wrong again.
//
// The alternative was an internal-user filter in the project settings, and it was not taken:
// it would have to key on something, and the only candidates were a Swiss IP and a Swiss
// city - which is also what a real hiker in Zurich looks like.
try {
  var phFlag = new URLSearchParams(location.search).get('ph');
  if (phFlag === 'off') posthog.opt_out_capturing();
  if (phFlag === 'on') posthog.opt_in_capturing();
} catch (e) { /* an old browser without URLSearchParams simply stays counted */ }
