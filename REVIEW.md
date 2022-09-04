# Review

Let's see the application code.
As we can see, this application was generated using create-react-app. All files look pretty standard.
So let's take a look at App.tsx.
The application is quite small and the current implementation looks good for an application of this size.
But let's pretend that this application was created for enterprises.

What can we improve here? What can we improve in any application?
There are some things we can always improve. It's performance and code maintainability (code readability).

## Bugs

First bug I encountered is that there is no `deps` in `useEffect`, while there is a change in the state of the component in the `useEffect` callback, because of this, the useEffect callback will be called every time the state changes and we will get a behavior in which a request will occur every time the component is rendered.

``` typescript
  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => {
        setAdvice(data.slip.advice);
      })
      .catch((e) => console.error(e));
  });
```

To fix this we need to pass `[]` to `useEffect` as `deps`. Like this.

``` typescript
  useEffect(() => {
    // ... same code as above
  }, []); // <-- 
```

Second error is that there are no keys in the repeated `<li>` components.

``` typescript
      <ul>
        {results.map((result) => (
          <li>{result.advice}</li>
        ))}
      </ul>
```

We can use `id` for that purpose.

``` typescript
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.advice}</li> // <--
        ))}
      </ul>
```

And last one, the loading indicator on the first load is different from the indicator on subsequent ones.
Let's make same loading indicator like `loading...`.

## Code maintainability

### Api client

As we can see, there is a lot of duplication in the code. For example `8-13` lines and `21-26` lines.
Let's move all the api calls into separate functions (let's call them `"api-functions"`) and then replace them in another file. All `"api-functions"` are about advice. Let's name the file for these functions, like `api/advices/index.ts`.

So, now it looks better, but we still have a lot of code duplication between `"api-functions"`.
What if we want to add some functionality to requests, such as aborting a request? Will we have to add such functionality to every `"api-function"`?
Let's move all the code duplication and create an `ApiClient` (`api/ApiClient`).

Much better, but there is one thing we can improve. Let's create a `.env` file and move the url to `advices-service` there.

### Custom hooks

So, back to App.tsx. Now the requesting and view logic is separated, but we still have not enough abstractions here.
Let's implement a few custom react hooks `useAdvice` to get a single advice, and `useAdviceSearch` to search for advice by keyword.
As we can see, there is a duplicate code between `useAdvice` and `useAdviceSearch`, let's create another abstraction and call it `useResource`.

### Custom components

So, back to App.tsx again and split all mark up to components such as `Form`, `List` and `Loader`.

## Performance

Let's improve performance. First, let's implement request aborting in our `ApiClient`. Second, let's throttle form events.

In order to get rid of unnecessary renders of components, we will wrap in memo HOC. And all callbacks will be wrapped to useCallback.

## Testings

### Manual testing

First testing which I will use. This is `manual testing`. I will mainly use `dev tools` and some `extensions` for them like `react dev tools`, but it's up to tech stack.

Then, after `manual testing`, if I have enough time, I automate the testing.

### Unit testing

To test the application, I will use `unit testing`. I'll cover the core functions first, and then the other functions of the app.
If someone reports a bug during use the application, I will write a test for this case, if possible. I will use `Jest` framework for this.

### Integration Testing and End-to-End Testing

For `Integration testing` and `End-to-end testing` I will use `Cypress` or `webdriver.io` + `Selenium`. I will create some application specific commands (for `Cypress` or `webdriver.io`) and then implement the application scenarios.
