## 1. Capturing Network Errors

Sentry does not automatically log network errors like `404`, `500`, or other HTTP errors. These errors occur at the network layer and do not inherently throw JavaScript exceptions. To log these errors in Sentry, you need to manually capture them.

### 1.1 Manual Logging with `try-catch`
Wrap your network requests in `try-catch` blocks and use Sentry's `captureException` method to log errors. Here's an example:

```javascript
import * as Sentry from "@sentry/react";

const fetchData = async () => {
  try {
    const response = await fetch("/api/some-endpoint");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    Sentry.captureException(error); // Log error to Sentry
    throw error; // Re-throw the error if further handling is required
  }
};
```

### 1.2 Centralized Error Logging for API Requests
If your project uses an HTTP client like `axios`, you can set up interceptors to automatically capture and log errors globally:

```javascript
import axios from "axios";
import * as Sentry from "@sentry/react";

const apiClient = axios.create({
  baseURL: "/api",
});

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => response, // Pass successful responses
  (error) => {
    Sentry.captureException(error); // Log error to Sentry
    return Promise.reject(error); // Ensure promise rejection for further handling
  }
);

export default apiClient;
```

### 1.3 Enriching Errors with Context
You can add additional context to errors before sending them to Sentry. This makes debugging easier by providing more information:

```javascript
Sentry.captureException(error, {
  tags: { section: "API" },
  extra: { url: "/api/some-endpoint", status: error.response?.status },
});
```

### 1.4 Example Code:
```javascript
import axios from "axios";
import * as Sentry from "@sentry/react";

const apiClient = axios.create();

apiClient.interceptors.response.use(
  (response) => response, // Pass successful responses
  (error) => {
    const apiUrl = error.config?.url || "Unknown URL";
    const apiMethod = error.config?.method?.toUpperCase() || "UNKNOWN METHOD";
    const status = error.response?.status || "Unknown Status";

    // Customize the error message
    const customMessage = `API Error: [${apiMethod}] ${apiUrl} returned status ${status}`;
    Sentry.captureException(new Error(customMessage), {
      tags: {
        type: "API ERROR",
        url: apiUrl,
        method: apiMethod,
        status: status,
      },
      extra: { // extra: it's used for pass extra detail about error message.
        data: error.response?.data, // pass error response data
      },
      fingerprint: [ // it will create a new issue based on url,method and status
        "{{ default }}", // Retain the default grouping
        error.config?.url, // Group by the API URL
        error.config?.method, // Group by the API method
        error.response?.status?.toString(), // Group by the status code
      ]
    }); // Log error to Sentry
    return Promise.reject(error); // Ensure promise rejection for further handling
  }
);

export default apiClient;
```
- Error tags:
![image](https://github.com/user-attachments/assets/acb248c6-b44c-4bef-ab63-e41558aeecd3)
![image](https://github.com/user-attachments/assets/ad6b6f4e-2496-482e-8a6a-61340e9ca0b0)
- Create New issue if `API`, `STATUS`, `METHOD` is different and log that issue in same issue.
![image](https://github.com/user-attachments/assets/e08890fa-1c27-4731-b1cc-f8682a13da6c)




### Why Doesn't Sentry Capture Network Errors Automatically?
Sentry captures **unhandled exceptions** in JavaScript. Network errors like `404` or `500` are often returned as part of a response object or a promise rejection, which are not unhandled exceptions. This is why you need to explicitly handle and log them as shown above.

---

By using these approaches, you can effectively log network errors and monitor them in Sentry alongside other JavaScript errors.

