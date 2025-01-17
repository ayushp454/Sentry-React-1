# 🚀 Sentry + React 2 [Configuration Options](https://docs.sentry.io/platforms/javascript/configuration/)

Welcome to the **Sentry Configuration Guide for React**! This guide helps you integrate Sentry into your React application step by step. Let’s make error tracking a breeze! 🌟

---

## Table of Contents
1. [DSN Option 🔑](#1️⃣-dsn-option-in-sentry-)
2. [Release Option 🎯](#2️⃣-release-option-in-sentry-)
3. [Environment Option 🌍](#3️⃣-environment-option-in-sentry-)
4. [SampleRate Option 🎯](#4️⃣-samplerate-option-)
5. [MaxBreadcrumbs Option 🍞](#5️⃣-maxbreadcrumbs-option-)
6. [IgnoreErrors Option 🚫](#6️⃣-ignoreerrors-option-)
7. [DenyUrls Option 🚫🌐](#7️⃣-denyurls-option-)
8. [AllowUrls Option ✅🌐](#8️⃣-allowurls-option-)


### 1️⃣ **`dsn` Option in Sentry** 🔑  

The **`dsn` (Data Source Name)** is your app's connection to Sentry, acting as a bridge to send error and performance data. It's like an address that tells your app where to deliver the error reports. 📡  

#### 🔍 Why is the `dsn` Important?  
- ✅ **Authentication**: It ensures your app communicates securely with Sentry.  
- ✅ **Routing**: It tells Sentry where to collect error and performance data.  
- ✅ **Project-Specific**: Each project gets a unique `dsn` to keep data organized.  

#### 📍 Where to Find Your `dsn`?  
You can locate your `dsn` in **Project Settings > Client Keys (DSN)** in Sentry.  

#### 📝 How to Use the `dsn`?  
Here’s how you configure it in your app:  
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://<publicKey>@o<orgId>.ingest.sentry.io/<projectId>", // 🔗 Your unique DSN
  tracesSampleRate: 1.0,
});
```

#### 🎯 Real-Life Analogy  
Imagine your app is like a delivery service 📦, and the `dsn` is the destination address 🏠. Without it, the package (error data) can’t reach its destination (Sentry).  

#### ❌ What If You Skip the `dsn`?  
- **No Data Will Be Sent**: Sentry won’t track errors or performance.  
- **SDK Disables Itself**: The SDK will automatically stop working if no `dsn` is provided.  

#### 💡 Key Takeaways  
- Set the `dsn` to ensure smooth error tracking.  
- Use different `dsn` values for different projects.  
- Keep it secure and avoid exposing it in sensitive client-side code.  

---

### 2️⃣ **`release` Option in Sentry** 🎯  

The **`release`** option ties errors and performance data to specific app versions, helping you identify issues caused by new releases or regressions in existing features. 🚀  

#### 🔍 Why Use the `release` Option?  
- ✅ **Track Issues by Version**: Know exactly which app version caused an issue.  
- ✅ **Source Map Integration**: Debug easily with readable stack traces.  
- ✅ **Monitor Regressions**: Spot old bugs reappearing in new versions.  

#### 📝 How to Use the `release` Option?  
Set the release manually in your Sentry config:  
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://<publicKey>@o<orgId>.ingest.sentry.io/<projectId>",
  release: "my-app@1.0.0", // 🛠️ App version for tracking
  tracesSampleRate: 1.0,
});
```

#### ⚙️ Automate Release with Build Systems  
You can dynamically set the release using environment variables:  
```javascript
Sentry.init({
  dsn: "https://<publicKey>@o<orgId>.ingest.sentry.io/<projectId>",
  release: `my-app@${process.env.APP_VERSION}`, // 🚀 Dynamically generated release
});
```

#### 🌐 Default Behavior  
If you don’t manually set it, the SDK will check for `window.SENTRY_RELEASE.id`:  
```javascript
window.SENTRY_RELEASE = { id: "my-app@1.0.0" };

Sentry.init({
  dsn: "https://<publicKey>@o<orgId>.ingest.sentry.io/<projectId>",
});
```

#### 🎯 Real-Life Analogy  
Let’s say you launch two app versions, `1.0.0` and `1.1.0`. After deploying `1.1.0`, you notice new issues. The `release` option helps you trace these errors specifically to version `1.1.0`. It even flags reoccurring bugs from `1.0.0`—helping you prioritize fixes!  

#### 💡 Key Takeaways  
- Always set the `release` option to track issues by app version.  
- Combine it with source maps for effective debugging.  
- Automate release setup for hassle-free integration.  

---

### 3️⃣ **`environment` Option in Sentry** 🌍  

The **`environment`** option allows you to categorize error and performance data based on the deployment environment. This makes it easier to identify issues specific to different stages of your application, like **development**, **staging**, or **production**. 🚦  

---

#### 🔍 Why Use the `environment` Option?  
- ✅ **Organized Data**: Separate errors by environment to keep logs clean and focused.  
- ✅ **Easier Debugging**: Quickly identify if an issue is environment-specific.  
- ✅ **Targeted Notifications**: Set up alerts only for critical environments like production.  
- ✅ **Deployment Insights**: Monitor the stability of each environment independently.  

---

#### 📝 How to Use the `environment` Option?  
You can set the `environment` during Sentry SDK initialization:  
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://<publicKey>@o<orgId>.ingest.sentry.io/<projectId>",
  environment: "production", // 🌟 Set the deployment environment
  tracesSampleRate: 1.0,
});
```


#### 🏗️ Example with Multiple Environments  
Imagine you have three deployment stages:  
- Development 🛠️  
- Staging 🚧  
- Production 🌟  

You can dynamically assign the `environment` based on your build pipeline or environment variables:  
```javascript
Sentry.init({
  dsn: "https://<publicKey>@o<orgId>.ingest.sentry.io/<projectId>",
  environment: process.env.NODE_ENV || "development", // 🌍 Dynamically set the environment
  tracesSampleRate: 1.0,
});
```

---

#### 🎯 Real-Life Analogy  
Think of your app environments like different rooms in a building:  
- **Development Room** 🛠️: A testing space where anything can break.  
- **Staging Room** 🚧: A demo area for testing before public release.  
- **Production Room** 🌟: The live space where users interact.  

With the `environment` option, you can quickly find out which "room" an issue originated from, ensuring targeted fixes.  

---

#### 📊 Benefits of Using `environment`  
- **Focus on What Matters**: Analyze production errors without noise from development.  
- **Fine-Tuned Alerts**: Only get notified for high-priority environments.  
- **Enhanced Insights**: Compare stability between staging and production environments.  

---

#### 🚨 What Happens if You Don’t Set `environment`?  
By default, Sentry assigns all data to a generic environment. This can lead to:  
- Mixed logs from different stages.  
- Difficulty isolating environment-specific issues.  
- Alerts triggering unnecessarily for non-critical environments.  

---

#### 💡 Key Takeaways  
- Always set the `environment` option for clear separation of error data.  
- Use environment variables to dynamically manage environments.  
- Gain insights and maintain focus by organizing data per deployment stage.

By leveraging the `environment` option, you can streamline debugging and monitoring across all stages of your app’s lifecycle! 🚀  


---

### 4️⃣ `sampleRate` Option 🎯

The `sampleRate` option helps you control how often events are tracked or errors are reported. It works by setting a percentage (from 0 to 100) that determines the likelihood of an event being sent to the server. This can be useful for reducing the volume of data or focusing on more important events. 🌐

#### How it Works 🔍
- **0** means no events are sent. This effectively disables error tracking.
- **100** means all events are sent.
- **50** means 50% of the events will be sent at random.

#### Example 📝

Let's say you only want to send 30% of errors or events. You can configure the `sampleRate` like this:

```js
Sentry.init({
  dsn: "https://your_sentry_dsn",
  sampleRate: 0.3, // 30% of events will be sent
});
```

In the above example, **30%** of the errors or events will be captured and sent to Sentry, while the rest will be ignored. This can help you reduce noise and focus on the most important issues. 🎯

#### When to Use it ⚙️
- If you're trying to minimize the performance overhead of error tracking.
- When you have high traffic and want to sample only a subset of events.

With `sampleRate`, you have full control over how much data is being sent, helping you optimize the monitoring and error-tracking experience! 🎉

---

### 5️⃣ `maxBreadcrumbs` Option 🍞

The `maxBreadcrumbs` option helps you control how many breadcrumbs (contextual logs) you want to keep for tracking events or errors. Breadcrumbs are like little pieces of information that tell the story of what happened before an error. 📝

#### Default Value 📊
- The default value for `maxBreadcrumbs` is **100**. This means, by default, Sentry will store up to 100 breadcrumbs before discarding older ones.

#### Why Use `maxBreadcrumbs`? 🤔
When your app is busy, it can generate a lot of breadcrumbs. If you don’t want to store too many, you can set a limit on how many should be kept.

- **Less is more**: Set a lower number to save memory and focus on the most recent events.
- **More context**: Set a higher number if you want to keep a longer history of actions before errors happen.

#### Example 📝

Let’s say you want to store only the last 5 breadcrumbs. You can set it like this:

```js
Sentry.init({
  dsn: "https://your_sentry_dsn",
  maxBreadcrumbs: 5, // Keeps the last 5 breadcrumbs, older ones are removed
});
```

In this case, **only the latest 5 breadcrumbs** will be stored. Once you reach 5, older ones will be discarded to make room for new ones.

#### When Should You Use It? ⚙️
- If your app is generating too many breadcrumbs and you want to limit storage.
- If you only need the most recent context to help debug issues.

By using `maxBreadcrumbs`, you can manage how much data is saved, keeping your app efficient while still providing enough context for debugging. 🚀

---

### 6️⃣ `ignoreErrors` Option 🚫

The `ignoreErrors` option allows you to filter out specific errors or exceptions that you don't want to track or report. This can be helpful when you know certain errors are harmless or should not clutter your error logs. 🚫

#### How it Works 🔍

By providing an array of error messages, error types, or regular expressions, you can specify which errors should be ignored. This way, only the important issues are reported, and you don't get overwhelmed with unnecessary ones.

#### Example 📝

Let's say you want to ignore errors that are related to a specific API failure or a known issue in your application. You can configure `ignoreErrors` like this:

```javascript
Sentry.init({
  dsn: "https://your_sentry_dsn",
  ignoreErrors: [
    "NetworkError",         // Ignore any network-related errors
    "Failed to fetch",      // Ignore fetch-related errors
    /non-critical error/i,  // Ignore any error with the text "non-critical error"
  ],
});
```

In the above example:
- Any error with the name `NetworkError` will be ignored.
- Errors with the message `Failed to fetch` will not be sent to Sentry.
- Errors matching the regular expression `/non-critical error/i` will be ignored as well.

#### When to Use it ⚙️

- If there are known errors that don’t need attention (like a specific browser warning or a non-critical feature issue).
- When you want to reduce noise in your error reporting system and focus only on critical problems.

With the `ignoreErrors` option, you can ensure that your error logs are cleaner and contain only the errors that truly matter. 🌟

---

### 7️⃣ `denyUrls` Option 🚫🌍

The `denyUrls` option in Sentry lets you **exclude specific pages or routes** from error tracking. This is useful when you don’t want to send errors from certain parts of your app, such as login pages, external services, or static assets. By doing this, you keep your error reports cleaner and focus only on what really matters. 🎯

#### How It Works 🔧

You can provide a list of **URLs** or **URL patterns** (using regular expressions) that should be ignored by Sentry. Any errors that happen on these URLs won’t be sent to Sentry.

#### Example: Excluding Specific Routes 📝

Let’s say you want to ignore errors on specific routes, like `/login`, `/admin`, or any route that starts with `/public/`. Here’s how you can do it:

```js
Sentry.init({
  dsn: "https://your_sentry_dsn",
  denyUrls: [
    "/login",               // Ignore errors on the exact /login route
    /\/login$/,             // Ignore errors on the /login route
    /\/admin\/.*/,          // Ignore errors on routes under /admin/
    /\/public\/.*/,         // Ignore errors on routes under /public/
  ],
});
```

In this example:
- Errors on the `/login` page will be ignored.
- Errors on any `/admin/*` route (like `/admin/dashboard`) will be excluded.
- Errors on `/public/*` routes won’t be reported.

#### How It Works with React Router 🌐

In a React app using React Router, `denyUrls` can help you exclude errors from specific routes in your app. For example:

```js
<BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/admin/*" element={<Admin />} />
    <Route path="/public/*" element={<Public />} />
  </Routes>
</BrowserRouter>
```

With this setup, any errors that happen on `/login`, `/admin/*`, or `/public/*` routes will not be sent to Sentry.

#### When Should You Use `denyUrls`? ⚙️

- **To avoid tracking errors on non-critical pages**: For example, login pages or external URLs.
- **To ignore errors from static files**: Such as CSS or JavaScript files that don’t need to be monitored.
- **To focus on important issues**: Keep your error reports clean and relevant by excluding unnecessary routes.

By using `denyUrls`, you can ensure that only relevant errors are tracked, making it easier to manage your Sentry dashboard and focus on fixing the issues that matter most. 💡

---


### 8️⃣ `allowUrls` Option ✅🌐

The `allowUrls` option in Sentry allows you to **restrict error tracking** to only specific URLs or domains. This can be helpful when you want to capture errors only from certain scripts or resources, like those loaded from your own domain or a trusted CDN. 🛠️

#### How It Works 🔍

The `allowUrls` option accepts an array of **strings** or **regular expressions**. Sentry will only capture errors if the **top stack frame’s URL** matches or contains at least one entry in the `allowUrls` array. 

- **String matching**: If you pass a string, Sentry checks if the **URL contains** that string.
- **Regex matching**: If you pass a regular expression, Sentry checks if the URL **matches** the pattern.

#### Example: Capture Errors from Specific URLs 📝

Let’s say your JavaScript is hosted on `cdn.example.com`, and you want to capture errors only from scripts loaded from this CDN and not from other sources. You can configure `allowUrls` like this:

```js
Sentry.init({
  allowUrls: [/https?:\/\/((cdn|www)\.)?example\.com/],
});
```

In this example:
- **Regex matching** is used to include URLs from both `cdn.example.com` and `www.example.com`.
- Only errors originating from scripts loaded from `cdn.example.com` will be sent to Sentry.

#### When to Use `allowUrls` ⚙️

- **Track errors only from trusted sources**: If you’re using third-party scripts or CDNs, you can filter out errors that happen from untrusted or external URLs.
- **Limit error tracking**: If you want to focus only on errors from certain parts of your application (e.g., from your core app or specific components), `allowUrls` helps you narrow down the scope.

#### Example Use Cases 🌟

- **Capture errors only from your domain**: If your app is hosted on `example.com`, and you’re using external scripts or resources, you might only want to track errors from `example.com`:
  
```js
Sentry.init({
  allowUrls: [/https?:\/\/example\.com/],
});
```

- **Capture errors from both your domain and a CDN**: If you're using a CDN for script loading, you can capture errors from both your main site and the CDN:
  
```js
Sentry.init({
  allowUrls: [/https?:\/\/((cdn|www)\.)?example\.com/],
});
```
#### Key Differences 📊

| **Option**                | **Purpose**                                          | **Focus**        | **Example Use Case**                                  |
|---------------------------|------------------------------------------------------|------------------|--------------------------------------------------------|
| **`tracePropagationTargets`** | Controls which URLs will propagate **performance traces** (e.g., transactions, spans). | **Performance**   | Propagate traces only for specific domains (e.g., `frontend.example.com`). |
| **`allowUrls`**            | Filters which **error events** are sent to Sentry based on the source URL of the error. | **Error Tracking** | Capture errors only from specific domains (e.g., `cdn.example.com`). |


#### Summary 📝

- `allowUrls` helps you **restrict error reporting** to specific URLs or domains, ensuring that only errors from trusted scripts are captured.
- You can use both **string matching** and **regular expressions** to define the URLs.
- This option is particularly useful for applications that load JavaScript from multiple sources, allowing you to filter errors based on their origin.

---

