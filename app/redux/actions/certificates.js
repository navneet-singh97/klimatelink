export const EMPLOYMENT_VC = 'EMPLOYMENT_VC';
export const EDIT_CERTIFICATE = 'EDIT_CERTIFICATE';
export const ORGS_LIST = 'ORGS_LIST';

export function onEmploymentVc(data) {
  return async dispatch => {
    return dispatch({
      type: EMPLOYMENT_VC,
      payload: data,
    });
  };
}

export function onEditCertificate(data) {
  return async dispatch => {
    return dispatch({
      type: EDIT_CERTIFICATE,
      payload: data,
    });
  };
}

export function orgsList(data) {
  return async dispatch => {
    return dispatch({
      type: ORGS_LIST,
      payload: 'orgs_list',
    });
  };
}

export default {
  EMPLOYMENT_VC,
  EDIT_CERTIFICATE,
  ORGS_LIST,
  onEmploymentVc,
  onEditCertificate,
  orgsList,
};
