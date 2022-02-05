import {
  EMPLOYMENT_VC,
  EDIT_CERTIFICATE,
  ORGS_LIST,
} from "./../actions/certificates";

export default function certificates(state = {}, action) {
  switch (action.type) {
    case EMPLOYMENT_VC:
      return {
        ...state,
        employmentVCInfo: action.payload,
      };
    case EDIT_CERTIFICATE:
      return {
        ...state,
        editCertificate: action.payload,
      };
    case ORGS_LIST:
      return {
        ...state,
        getOrgsList: action.payload,
      };
  }
  return state;
}
