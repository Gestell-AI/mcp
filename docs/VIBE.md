# Vibecode Guide for Cursor and Windsurf

## Getting started

Make sure to grab your API Key for Gestell [here](https://platform.gestell.ai).

Add the Gestell MCP Protocol to your project config or global config. Config viewable in the [README](../README.md).

## Collection Creation

It is recommended to give some context of what your collection will contain. Below is an example:

```text
Create a new Collection in Gestell called "Typescript Guides".
It will contain guides on Typescript.
Focus on indexing best practices.
```

If you want to create tabular or feature extracted data, add this on to the original prompt:

```text
Create a table category that indexes "type", "key point".
```

This will create a table viewable in your collection on the Gestell Dashboard.

## Uploading Documents

It is recommended to @ the document directly, for example, in this repo, you would prompt this:

```text
Upload the document @file:docs/demos/samples/typescript.pdf to the Typescript Guides collection in Gestell.
```

## Status of processing

It may take a few minutes for your document to upload. You can check the status of processing in your collection by prompting this:

```text
Check the status of the documents Gestell collection Typescript Guides.
```

## Prompting

Now you can prompt the collection directly and get key insights. For example:

```text
What are the top 5 key insights from the Typescript Guides collection?
```

You can also prompt the table directly and get key insights. For example:

```text
What are the top 5 key insights from the Typescript Guides collection table category?
```
