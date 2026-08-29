// Website analytics — PostHog, EU cloud.
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
  // EU region. Chosen for a Swiss author and a mostly European reader; the US region
  // is a different account entirely and a project cannot be moved between them.
  api_host: 'https://eu.i.posthog.com',

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
