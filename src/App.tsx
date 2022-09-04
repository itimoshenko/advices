import { useAdvice } from "./hooks/useAdvice";
import { useAdvicesSearch } from "./hooks/useAdvicesSearch";

import { Loader } from "./components/Loader";
import { List } from "./components/List";
import { Form } from "./components/Form";

import { NOOP } from "./utils";

import { FullAdvice } from "./types/advices";

interface SearchAdvicesFormElements extends HTMLFormControlsCollection {
  search: HTMLInputElement;
}

interface SearchAdvicesFormElement extends HTMLFormElement {
  readonly elements: SearchAdvicesFormElements;
}

const renderItem = (item: FullAdvice) => {
  return item.advice;
};

const prepareSearchAdvicesOptions = (form: SearchAdvicesFormElement) => ({
  search: form.elements.search.value
});

export default function App() {
  const { resource: advice, load: loadAdvice, isLoading } = useAdvice();
  const { resource: advices, load: searchAdvices } = useAdvicesSearch();

  return (
    <main>
      <h1>Are you looking for advice?</h1>

      <p>
        "<Loader isLoading={isLoading}>{advice}</Loader>"
      </p>

      <Form onLoad={loadAdvice} onPrepareOptions={NOOP}>
        <button type="submit">Gimme more advice!</button>
      </Form>

      <br />

      <Form
        onLoad={searchAdvices}
        onPrepareOptions={prepareSearchAdvicesOptions}
      >
        <p>Search for more advice:</p>
        <input type="text" name="search" />
        <button type="submit">Search</button>
      </Form>

      <List data={advices} renderItem={renderItem} />
    </main>
  );
}
