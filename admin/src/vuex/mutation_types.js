'use strict'

const tokenTypes = {
  TOKEN_CREATE: 'TOKEN_CREATE',
  TOKEN_DELETE: 'TOKEN_DELETE'
}

const draftTypes = {
  DRAFT_CREATE: 'DRAFT_CREATE',
  RECEIVE_ALL_DRAFTS: 'RECEIVE_ALL_DRAFTS',
  DRAFT_FOCUS: 'DRAFT_FOCUS',
  DRAFT_TITLE_EDIT: 'DRAFT_TITLE_EDIT',
  DRAFT_TITLE_MODIFY: 'DRAFT_TITLE_MODIFY',
  DRAFT_LAST_EDIT_TIME: 'DRAFT_LAST_EDIT_TIME',
  DRAFT_TITLE_SAVE: 'DRAFT_TITLE_SAVE',
  DRAFT_TAG_MODIFY: 'DRAFT_TAG_MODIFY',
  DRAFT_PUBLISH: 'DRAFT_PUBLISH',
  DRAFT_EXCERPT_MODIFY: 'DRAFT_EXCERPT_MODIFY',
  DRAFT_EDIT: 'DRAFT_EDIT',
  DRAFT_SAVE: 'DRAFT_SAVE',
  DRAFT_DELETE: 'DRAFT_DELETE'
}

export const GET_POSTS = 'GET_POSTS'
export const REFRESH_POSTS = 'REFRESH_POSTS'

export const GET_POST = 'GET_POST'
export const EDIT_POST_TITLE = 'EDIT_POST_TITLE'
export const SAVE_POST_TITLE = 'SAVE_POST_TITLE'
export const MODIFY_POST_TAG = 'MODIFY_POST_TAG'
export const EDIT_POST = 'EDIT_POST'
export const SAVE_POST = 'SAVE_POST'
export const FOCUS_ON_FIRST_POST = 'FOCUS_ON_FIRST_POST'
export const PUBLISH_POST = 'PUBLISH_POST'

export const GET_TAGS = 'GET_TAGS'
export const MODIFY_TAG = 'MODIFY_TAG'
export const REFRESH_TAGS = 'REFRESH_TAGS'

const msgTypes = {
  SHOW_MSG: 'SHOW_MSG',
  HIDE_MSG: 'HIDE_MSG'
}

export {tokenTypes, draftTypes, msgTypes}
