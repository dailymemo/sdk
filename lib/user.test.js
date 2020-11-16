const User = require('./user')
const API = require('./api')

const robot = {
  id: '44cfc6e6-934a-4d4c-9bef-080cdff46483',
  introduction: '',
  created_at: '2020-11-06 13:17:24.714099',
  web_push_client: null,
  domain: null,
  email_state: 0,
  avatar: 'https://giki.app/images/avatar.svg',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0Y2ZjNmU2LTkzNGEtNGQ0Yy05YmVmLTA4MGNkZmY0NjQ4MyIsIm5hbWUiOiJnaWtpYXBwcm9ib3QiLCJwcm92aWRlciI6Imdpa2kiLCJwcm92aWRlclVzZXJJZCI6Imdpa2ktcm9ib3QtMSIsImlhdCI6MTYwNTUwNzk3MiwiZXhwIjoxNjA4MDk5OTcyfQ.veM_nm-tzKR_ZYZyjmwoAHjgzoPzH8jkFEQXqYp4c5g',
  expo_push_token: null,
  updated_at: '2020-11-06 13:17:24.714099',
  domain_state: 0,
  enable_push_notification: false,
  enable_dropbox_syncup: false,
  enable_weibo_syncup: false,
  email: null,
  name: 'gikiapprobot',
}

describe('Talk', () => {
  describe('Authorization', () => {
    beforeEach(() => {
      API.init({
        env: 'staging',
        token: robot.token,
      })
    })

    it('Login', async () => {
      const user = new User()
      const res = await user.login()
      expect(res.status).toBe(200)
      expect(await res.json()).toEqual({
        avatar: 'https://giki.app/images/avatar.svg',
        created_at: '2020-11-06T13:17:24.714Z',
        domain: null,
        domain_state: 0,
        email: null,
        email_state: 0,
        enable_dropbox_syncup: false,
        enable_push_notification: false,
        enable_weibo_syncup: false,
        expo_push_token: null,
        id: '44cfc6e6-934a-4d4c-9bef-080cdff46483',
        introduction: '',
        name: 'gikiapprobot',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0Y2ZjNmU2LTkzNGEtNGQ0Yy05YmVmLTA4MGNkZmY0NjQ4MyIsIm5hbWUiOiJnaWtpYXBwcm9ib3QiLCJwcm92aWRlciI6Imdpa2kiLCJwcm92aWRlclVzZXJJZCI6Imdpa2ktcm9ib3QtMSIsImlhdCI6MTYwNTUwNzk3MiwiZXhwIjoxNjA4MDk5OTcyfQ.veM_nm-tzKR_ZYZyjmwoAHjgzoPzH8jkFEQXqYp4c5g',
        updated_at: '2020-11-06T13:17:24.714Z',
        web_push_client: null,
      })
    })
  })
})
