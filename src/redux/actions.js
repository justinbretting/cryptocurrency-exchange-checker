import _ from 'lodash';
import moment from 'moment';

let actions = {}

_.extend(actions, {
  setUser: function(user) {
    return { type: 'SET_USER', user }
  },
  clearUser: function() {
    return { type: 'CLEAR_USER' }
  },
  setLoginError(message) {
    return { type: 'SET_LOGIN_ERROR', message }
  },
  unsetLoginError() {
    return { type: 'UNSET_LOGIN_ERROR' }
  },
  login: function(username, password) {
    return (dispatch, getState) => {
      var state = getState();

      $.ajax({
        method: 'POST',
        url: '/api/authenticate',
        data: { username, password },
        success: (data, status, xhr) => {
          dispatch(this.setUser(data));
          dispatch(this.unsetLoginError());
          browserHistory.push('/home');
        },
        error: (xhr, textStatus, textErrorThrown) => {
          try {
            dispatch(this.setLoginError(xhr.responseJSON.msg))
          } catch(ex) {
            dispatch(this.setLoginError("There was a problem logging in. Try again or contact your account administrator."));
          }
        }
      })
    }
  },
  logout() {
    return (dispatch, getState) => {
      cookies.remove('_token');
      dispatch(this.clearUser());
      browserHistory.push('/login');
    }
  },
  submitMeeting: function(meeting) {
    return (dispatch) => {
      var urlParam = meeting.edit ? 'update/' + meeting.id : 'create/';
      $.ajax({
        method: meeting.edit ? 'PUT': 'POST',
        url: '/api/meetings/' + urlParam,
        data: meeting,
        success: (data, status, xhr) => {
          dispatch(this.clearMeetingFormError());
          dispatch(notify.success({ message: 'Meeting saved successfully' }));
          browserHistory.push('/meetings');
        },
        error: function() {
          errorHandler.call(this, ...arguments, dispatch, "There was a problem saving your meeting. Please try again later.");
        }
      })
    }
  },
  beginDeleteMeeting: function(meetingId) {
    return (dispatch) => {
      $.ajax({
        method: 'DELETE',
        url: '/api/meetings/' + meetingId,
        success: (data, status, xhr) => {
          dispatch(this.completeDeleteMeeting(meetingId));
        },
        error: function() {
          errorHandler.call(this, ...arguments, dispatch, "There was a problem deleting your meeting. Please try again later.");
        }
      })
    }
  },
  completeDeleteMeeting(meetingId) {
    return {'type': 'COMPLETE_DELETE_MEETING', meetingId};
  },
  beginDeleteWebRecording: function(recordId) {
    return (dispatch) => {
      $.ajax({
        method: 'DELETE',
        url: '/api/recordings/web/' + recordId,
        success: (data, status, xhr) => {
          dispatch(this.completeDeleteWebRecording(recordId));
        },
        error: function() {
          errorHandler.call(this, ...arguments, dispatch, "There was a problem deleting your web recording. Please try again later.");
        }
      })
    }
  },
  completeDeleteWebRecording(id) {
    return {'type': 'COMPLETE_DELETE_WEB_RECORDING', id};
  },
  beginDeleteAudioRecording: function(key) {
    return (dispatch) => {
      $.ajax({
        method: 'DELETE',
        url: '/api/recordings/audio/' + key,
        success: (data, status, xhr) => {
          dispatch(this.completeDeleteAudioRecording(key));
        },
        error: function() {
          errorHandler.call(this, ...arguments, dispatch, "There was a problem deleting your audio recording. Please try again later.");
        }
      })
    }
  },
  completeDeleteAudioRecording(key) {
    return {'type': 'COMPLETE_DELETE_AUDIO_RECORDING', key};
  },
  setInvalidEmail: function() {
    return {'type': 'SET_INVALID_EMAIL'};
  },
  unsetInvalidEmail: function() {
    return {'type': 'UNSET_INVALID_EMAIL'};
  },
  startMeeting: function(meeting) {
    return (dispatch) => {
      $.ajax({
        method: 'POST',
        url: '/api/conference/create',
        data: {
          id: meeting.id
        },
        success: (data, status, xhr) => {
          dispatch(this.joinMeeting(meeting))
        },
        error: function() {
          errorHandler.call(this, ...arguments, dispatch, "There was a problem starting your meeting. Please try again later.");
        }
      })
    }
  },
  setJoinMeetingError: function(error) {
    return {'type': 'SET_JOIN_MEETING_ERROR', error};
  },
  clearJoinMeetingError: function() {
    return {'type': 'CLEAR_JOIN_MEETING_ERROR'};
  },
  joinMeeting: function(meeting, opts) {
    return (dispatch) => {
      $.ajax({
        method: 'GET',
        url: '/api/conference/join/' + meeting.id + "?" + querystring.stringify(opts),
        success: (data, status, xhr) => {
          console.log('SUCCESS', data);
          window.location = data.url;
        },
        error: (xhr, textStatus, textErrorThrown) => {
          dispatch(this.setJoinMeetingError({
            statusCode: xhr.status,
            message: xhr.responseJSON.message
          }));
        }
      })
    }
  },
  fetchAudioAccounts: function() {
    return (dispatch) => {
      $.ajax({
        method: 'GET',
        url: '/api/accounts',
        success: (data, status, xhr) => {
          dispatch(this.setAudioAccounts(data))
        },
        error: function() {
          errorHandler.call(this, ...arguments, dispatch, "There was a problem fetching your dial-in credentials. Please try again later.");
        }
      })
    }
  },
  setAudioAccounts: function(accounts) {
    return {type: 'SET_AUDIO_ACCOUNTS', accounts }
  },
  setMeetingFormError: function(error) {
    return {type: 'SET_MEETING_FORM_ERROR', error}
  },
  clearMeetingFormError: function() {
    return {type: 'CLEAR_MEETING_FORM_ERROR'}
  },
  requestMeetings: function() {
    return { type: 'REQUEST_MEETINGS' };
  },
  receiveMeetings: function(meetings) {
    return {
      type: 'RECEIVE_MEETINGS',
      meetings: meetings,
      receivedAt: Date.now()
    };
  },
  fetchMeetings: function() {
    return (dispatch, getState) => {
      dispatch(this.requestMeetings());
      $.ajax({
        method: 'GET',
        url: '/api/meetings/getList',
        success: (data, status, xhr) => {
          dispatch(this.receiveMeetings(data));
        },
        error: function() {
          errorHandler.call(this, ...arguments, dispatch, "There was a problem fetching your meetings. Please try again later.");
        }
      })
    }
  },
  beginFetchRecentAndUpcomingMeetings: function() {
    return { type: 'BEGIN_FETCH_UPCOMING_MEETINGS' };
  },
  setRecentAndUpcomingMeetings: function(meetings) {
    return {
      type: 'SET_RECENT_AND_UPCOMING_MEETINGS',
      meetings: meetings,
      receivedAt: Date.now()
    };
  },
  fetchRecentAndUpcomingMeetings: function() {
    return (dispatch, getState) => {
      dispatch(this.beginFetchRecentAndUpcomingMeetings());
      $.ajax({
        method: 'GET',
        url: '/api/meetings/upcoming',
        success: (data, status, xhr) => {
          dispatch(this.setRecentAndUpcomingMeetings(data));
        },
        error: function() {
          errorHandler.call(this, ...arguments, dispatch, "There was a problem fetching recent and upcoming meetings. Please try again later.");
        }
      })
    }
  },
  requestWebRecordings: function() {
    return { type: 'REQUEST_WEB_RECORDINGS' };
  },
  receiveWebRecordings: function(recordings) {
    return {
      type: 'RECEIVE_WEB_RECORDINGS',
      recordings: recordings,
      receivedAt: Date.now()
    };
  },
  fetchWebRecordings: function() {
    return (dispatch, getState) => {
      dispatch(this.requestWebRecordings());
      $.ajax({
        method: 'GET',
        url: '/api/recordings/web',
        success: (data, status, xhr) => {
          dispatch(this.receiveWebRecordings(data));
        },
        error: function() {
          errorHandler.call(this, ...arguments, dispatch, "There was a problem retrieving your web recordings. Please try again later.");
        }
      })
    }
  },
  requestAudioRecordings: function() {
    return { type: 'REQUEST_AUDIO_RECORDINGS' };
  },
  receiveAudioRecordings: function(data) {
    return {
      type: 'RECEIVE_AUDIO_RECORDINGS',
      recordings: data.recordings,
      partialError: data.partialError,
      receivedAt: Date.now()
    };
  },
  fetchAudioRecordings: function() {
    return (dispatch, getState) => {
      dispatch(this.requestAudioRecordings());
      $.ajax({
        method: 'GET',
        url: '/api/recordings/audio',
        success: (data, status, xhr) => {
          dispatch(this.receiveAudioRecordings(data));
        },
        error: function() {
          errorHandler.call(this, ...arguments, dispatch, "There was a problem retrieving your audio recordings. Please try again later.");
        }
      })
    }
  }
})

export default actions;
