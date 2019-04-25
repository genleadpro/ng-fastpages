import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { PageService } from '@app/core/services/page.service';
import { PageModel, IVariantOption } from '@app/core';
import { findIndex as _findIndex, omit as _omit } from 'lodash';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CustomValidators } from '@app/shared/validators/custom-validators';
import { environment as env } from '@env/environment';
import * as moment from 'moment';

export class acceptedFile {
  name: string;
  file: File;
  constructor (name: string, file: File) {
    this.name = name;
    this.file = file;
  }
}

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss']
})
export class PageEditComponent implements OnInit {
  devMode: boolean = !env.production;
  id: number;
  step = 0;
  pageForm: FormGroup;
  error: string;
  isLoading: boolean;
  submitted = false;
  returnUrl: string = '../../../home';
  pageModel: PageModel;
  acceptedFiles = [];

  productVariantOptionList: FormArray;

  mediaInputs = [
    'product_image1', 'product_image2', 'product_image3',
    'product_image4', 'product_image5', 'product_image6',
    'product_showcase1', 'product_showcase2', 'product_showcase3', 'product_showcase4',
    'product_size_image'
  ];

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '5rem',
    minHeight: '10rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    uploadUrl: 'v1/images', // if needed
    customClasses: [ // optional
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.getPage();
    });
    this.buildForm();
  }

  getPage() {
    return this.pageService.getSingle(this.id)
      .pipe(first())
      .subscribe(data => {
        this.pageModel = data;

        let variantOptions = data.product_variant_options;
        // update tenant aware path and removed readonly properties using lodash omit
        data = _omit(this.correctMediaPath(data), [
          'hit_count', 'created_at', 'updated_at', 'owner', 'updated_by', 'product_variant_options']);
        this.pageForm.patchValue(data);
        this.pageForm.setControl('product_variant_options', this.setExistingVariantOptions(variantOptions));
        this.productVariantOptionList = this.pageForm.get('product_variant_options') as FormArray;
      });
  }

  // OnSubmit event
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.pageForm.invalid) {
      return;
    }
    this.isLoading = true;
    let formData = new FormData();
    let data = this.pageForm.getRawValue(); //.controls;
    console.log('Raw form values', data);
    let fd = this.convertModelToFormData(data);

    /*
    this.acceptedFiles.forEach(obj => {
      formData.append(obj.name, obj.file.file, obj.file.name);
    });

    Object.keys(data).forEach((key) => {
      if (this.mediaInputs.includes(key)) return; // continue next key
      if (key == 'available_on' || key == 'available_off' || key == 'product_discount_until') {
        formData.append(key, this.formatDate(this.pageForm.get(key).value));
      }else {

        formData.append(key, this.pageForm.get(key).value);
      }
    });
    */
    this.pageService.updatePage(this.id, fd /*formData*/)
      .pipe(first())
      .subscribe(
        data=> {
          this.router.navigate([this.returnUrl], {relativeTo: this.route});
      },
      error => {
        if (error instanceof HttpErrorResponse && error.status == 400) {
          if ("non_field_errors" in error.error) {
            let allErrors = error.error['non_field_errors'];
            this.error = allErrors[0];
          }
        }
        this.isLoading = false;
      });
  }

  buildForm() {
    this.pageForm = this.formBuilder.group({
      id: [],
      title: ['', [Validators.required, Validators.maxLength(200)]],
      slug: ['', [Validators.minLength(5), Validators.maxLength(30), CustomValidators.slugValidate]],
      status: [true, [Validators.required]],
      available_on: [],
      available_off: [],
      product_name: ['', [Validators.required, Validators.maxLength(100)]],
      product_description: [],
      product_details: [],
      product_price: [],
      product_discount_price: [],
      product_discount_until: [],
      product_variant_options: this.formBuilder.array([this.createVariantOptionFormGroup()]),
      product_image1: [],
      product_image2: [],
      product_image3: [],
      product_image4: [],
      product_image5: [],
      product_image6: [],
      product_showcase1: [],
      product_showcase2: [],
      product_showcase3: [],
      product_showcase4: [],
      product_size_image: [],
    });

    this.productVariantOptionList = this.pageForm.get('product_variant_options') as FormArray;
  }

  get f () {
    return this.pageForm.controls;
  }

  onCancelClicked() {
    this.router.navigate(['../../../home'], {relativeTo: this.route});
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  // Done: TEST
  onFileAccepted(event, key) {
    let aFile = new acceptedFile(key, event);
    this.acceptedFiles.push(aFile);
  }

  // Done: TEST
  onFileDeleted(event, key) {
    const index : number = _findIndex(this.acceptedFiles, function(item) {
        return item.name == key;
    });
    if (index !== -1) this.acceptedFiles.splice(index, 1);
  }

  setExistingVariantOptions(vOptions: IVariantOption[]): FormArray {
    const formArray = new FormArray([]);
    vOptions.forEach(option => {
      formArray.push(
        this.formBuilder.group({
          id : option.id,
          variant_name: option.variant_name,
          variant_value: option.variant_value
        })
      )
    });

    return formArray;
  }

  createVariantOptionFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [],
      variant_name: ['', Validators.compose([Validators.required])],
      variant_value: ['', Validators.compose([Validators.required])],
    });
  }

  addProductVariantOption() {
    this.productVariantOptionList.push(this.createVariantOptionFormGroup());
  }

  removeProductVariantOption(index) {
    this.productVariantOptionList.removeAt(index);
  }

  // returns all form groups under product_variants
  get productVariantOptionFormGroup() {
    return this.pageForm.get('product_variant_options') as FormArray;
  }

  // get the formgroup under contacts form array
  getProductVariantOptionFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.productVariantOptionList.controls[index] as FormGroup;
    return formGroup;
  }

  formatDate(dateStr: string) : string {
    let dt = moment(dateStr).format(env.serverDateFormat);
    return dt;
  }

  cleanData(data) {

    let cleaned = data;
    cleaned = _omit(data, this.mediaInputs)

    return cleaned;
  }

  correctMediaPath(data) {
    let tenantDomain = localStorage.getItem('tenant_url');

    Object.keys(data).forEach ((key) => {
      if (this.mediaInputs.indexOf(key) !== -1 ) {
        if (typeof data[key] == 'string') {
          let path: string = data[key];
          path = path.replace('/media/uploads/', '/media/'+ tenantDomain +'/uploads/');
          let image = [{preview: path}];
          data[key] = image;
        }else {

        }
      }

    });
    return data;
  }

  convertModelToFormData(model: any, form: FormData = null, namespace = ''): FormData {
    let formData = form || new FormData();
    let formKey;

    for (let propertyName in model) {
        if (!model.hasOwnProperty(propertyName) || !model[propertyName]) continue;
        let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
        if (model[propertyName] instanceof Date)
          formData.append(formKey, model[propertyName].toISOString());
        else if (model[propertyName] instanceof moment) {
          console.log('Found moment object');
          formData.append(formKey, model[propertyName].toISOString());
        }
        else if (model[propertyName] instanceof File)
          formData.append(formKey, model[propertyName].file, model[propertyName].name);
        else if (model[propertyName] instanceof Array) {
          // work around for File Input stored as array (of file and preview image) even if only one file usage
          if (this.mediaInputs.includes(propertyName)) {
            if (model[propertyName].length > 0  && model[propertyName][0].file instanceof File)
              formData.append(formKey, model[propertyName][0].file, model[propertyName][0].name);
            else
              continue;
          }
          else
            model[propertyName].forEach((element, index) => {
              const tempFormKey = `${formKey}[${index}]`;
              this.convertModelToFormData(element, formData, tempFormKey);
            });
        }
        else if (typeof model[propertyName] === 'object' && !(model[propertyName] instanceof File))
          this.convertModelToFormData(model[propertyName], formData, formKey);
        else
          formData.append(formKey, model[propertyName].toString());
    }
    return formData;
  }
}
