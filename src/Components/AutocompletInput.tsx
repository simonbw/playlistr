import React, { createRef, useState, ReactNode, ChangeEvent } from "react";
import { Paper, TextField } from "@material-ui/core";
import classNames from "classnames";
import Autosuggest from "react-autosuggest";

const autosuggestTheme: Autosuggest.Theme = {
  // container: "AutosuggestBox",
  // containerOpen: "AutosuggestBox",
  // input: "EditableField",
  // inputOpen: "",
  // inputFocused: "",
  suggestionsContainer: "AutosuggestBox",
  // suggestionsContainerOpen: "",
  suggestionsList: "AutosuggestList",
  suggestion: "AutosuggestOption",
  suggestionFirst: "AutosuggestOption--first",
  suggestionHighlighted: "AutosuggestOption--highlighted",
  sectionContainer: "AutosuggestSectionContainer",
  sectionContainerFirst: "AutosuggestSectionContainer--first",
  sectionTitle: "AutosuggestSectionTitle"
};

interface Props {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly options: string[];
  readonly className?: string;
  readonly label?: string;
}

export default function AutocompleteInput({
  value,
  onChange,
  options,
  label = "",
  className = ""
}: Props) {
  const filteredOptions = options.filter(
    option => option.toLowerCase().indexOf(value.toLowerCase()) >= 0
  );

  return (
    <div style={{ position: "relative" }} className={className}>
      <Autosuggest
        suggestions={filteredOptions}
        onSuggestionsFetchRequested={() => null}
        onSuggestionsClearRequested={() => null}
        focusInputOnSuggestionClick={false}
        inputProps={{
          value,
          onChange: (_, { newValue }) => onChange(newValue || "")
        }}
        getSuggestionValue={s => s}
        renderSuggestion={s => <span>{s}</span>}
        theme={autosuggestTheme}
        renderSuggestionsContainer={({ children, containerProps }) => (
          <Paper elevation={3} {...containerProps}>
            {children}
          </Paper>
        )}
        renderInputComponent={({ onChange, ...inputProps }) => (
          <TextField
            inputProps={inputProps}
            onChange={event => onChange(event, event as any)}
            label={label}
            size="small"
            margin="dense"
            fullWidth
          />
        )}
      />
    </div>
  );
}
