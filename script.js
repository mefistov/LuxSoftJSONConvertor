
const components = {
  text: {
    containerOpen: '<div class="form-group">',
    labelOpen: '<label class="form-label-sm">',
    labelClose: '</label>',
    open: '<input type="text" class="form-control"',
    placeholderOpen: ' placeholder="',
    placeholderClose: '"',
    close: '>',
    containerClose: '</div>'
  },
  textarea: {
    containerOpen: '<div class="form-group">',
    labelOpen: '<label class="form-label-sm">',
    labelClose: '</label>',
    open: '<textarea class="form-control"',
    placeholderOpen: ' placeholder="',
    placeholderClose: '"',
    close: '></textarea>',
    containerClose: '</div>'
  },
  checkbox: {
    containerOpen: '<div class="form-check">',
    open: '<input class="form-check-input ml-0" type="checkbox"',
    close: '>',
    labelOpen: '<label class="form-check-label form-label-sm">',
    labelClose: '</label>',
    containerClose: '</div>'
  },
  radio: {
    containerOpen: '<div class="form-check">',
    open: '<input class="form-check-input ml-0" type="radio" name="radios"',
    close: '>',
    labelOpen: '<label class="form-check-label form-label-sm">',
    labelClose: '</label>',
    containerClose: '</div>'
  },
  select: {
    containerOpen: '<div class="form-group">',
    labelOpen: '<label class="form-label-sm">',
    labelClose: '</label>',
    open: '<select class="form-control">',
    openMultiple: '<select multiple class="form-control">',
    optionOpen: '<option>',
    optionClose: '</option>',
    close: '</select>',
    containerClose: '</div>'
  },
  fileinput: {
    containerOpen: '<div class="form-group">',
    labelOpen: '<label class="form-label-sm">',
    labelClose: '</label>',
    open: '<input type="file" class="form-control-file"',
    close: '>',
    containerClose: '</div>'
  },
};


function buildTextField(field) {
  
  let textField = components.text.containerOpen;
  
  if (field.label) {
    textField += 
      components.text.labelOpen + 
      field.label + 
      components.text.labelClose;
  }
  textField += components.text.open;
  
  if (field.placeholder) {
    textField += 
      components.text.placeholderOpen + 
      field.placeholder + 
      components.text.placeholderClose;
  }
  
  textField += components.text.close;
  textField += components.text.containerClose;
  return textField;
}


function buildTextAreaField(field) {
  
  let textAreaField = components.textarea.containerOpen;
  
  if (field.label) {
    textAreaField += 
      components.textarea.labelOpen + 
      field.label + 
      components.textarea.labelClose;
  }
  textAreaField += components.textarea.open;
  
  if (field.placeholder) {
    textAreaField += 
      components.textarea.placeholderOpen + 
      field.placeholder + 
      components.textarea.placeholderClose;
  }
 
  textAreaField += components.textarea.close;
  textAreaField += components.textarea.containerClose;
  return textAreaField;
}


function buildCheckboxField(field) {
  
  let checkboxField = components.checkbox.containerOpen;
  checkboxField += components.checkbox.open;
  checkboxField += components.checkbox.close;
  
  if (field.label) {
    checkboxField += 
      components.checkbox.labelOpen + 
      field.label + 
      components.checkbox.labelClose;
  }
  
  checkboxField += components.checkbox.containerClose;
  return checkboxField;
}


function buildRadioField(field) {
  
  let radioField = components.radio.containerOpen;
  radioField += components.radio.open;
  radioField += components.radio.close;
  
  if (field.label) {
    radioField += 
      components.radio.labelOpen + 
      field.label + 
      components.radio.labelClose;
  }
 
  radioField += components.radio.containerClose;
  return radioField;
}


function buildSelectField(field) {
  
  let selectField = components.select.containerOpen;
  
  if (field.label) {
    selectField += 
      components.select.labelOpen + 
      field.label + 
      components.select.labelClose;
  }
  
  if (field.type === 'multipleselect') {
    selectField += components.select.openMultiple;
  } else {
    selectField += components.select.open;
  }
  
  if (field.options) {
    for (let i = 0; i < field.options.length; i++) {
      selectField += components.select.optionOpen + 
        field.options[i] + 
        components.select.optionClose;
    }
  }
  selectField += components.select.close;
  
  selectField += components.select.containerClose;
  return selectField;
}


function buildFileInputField(field) {
  
  let fileField = components.fileinput.containerOpen;
  
  if (field.label) {
    fileField += 
      components.fileinput.labelOpen + 
      field.label + 
      components.fileinput.labelClose;
  }
  fileField += components.fileinput.open;
  
  if (field.placeholder) {
    fileField += 
      components.fileinput.placeholderOpen + 
      field.placeholder + 
      components.fileinput.placeholderClose;
  }
  
  fileField += components.fileinput.close;
  fileField += components.fileinput.containerClose;
  return fileField;
}


function buildJSONForm(json) {
  let form = '<form>';
  let formFields = Object.getOwnPropertyNames(json);
  for (let i = 0; i < formFields.length; i++) {
    let currentField = json[formFields[i]];
      if(currentField.type == 'text'){
        form += buildTextField(currentField);
      } else if(currentField.type == 'textarea') {
         form += buildTextAreaField(currentField);
      } else if(currentField.type == 'checkbox') {
        form += buildCheckboxField(currentField);
      } else if(currentField.type == 'radio') {
        form += buildRadioField(currentField);
      } else if(currentField.type == 'select') {
        form += buildSelectField(currentField);
      } else if(currentField.type == 'multipleselect') { 
        form += buildSelectField(currentField);
      } else if(currentField.type == 'fileinput') { 
        form += buildFileInputField(currentField);
      } else {
        alert("The " + currentField.type + " field type is not currently supported. Please try with a different field.");
    }
  }
  form += '</form>'
  return form;
}

function drawForm(jsonInput, destinationId) {
  
  try {
    var input = JSON.parse(jsonInput);
  } catch (e) {
    alert('Your submission resulted in this error:\n\n' + 
          e + '\n\nPlease enter valid JSON and try again.');
  }
  
  let resultForm = buildJSONForm(input);
  
  $(destinationId).html(resultForm);
}