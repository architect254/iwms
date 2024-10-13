import { FormGroup } from '@angular/forms';

export function passwordsMismatchValidator() {
  return (form: FormGroup) => {
    const password = form.get(`password`);
    const confirm_password = form.get(`confirm_password`);

    if (
      confirm_password?.errors &&
      !confirm_password?.errors[`passwordsDontMatch`]
    ) {
      return;
    }

    if (password?.value !== confirm_password?.value) {
      confirm_password?.setErrors({ passwordsDontMatch: true });
    } else {
      confirm_password?.setErrors(null);
    }
  };
}
