const Talk = require('./talk')
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
  describe('Create', () => {
    beforeEach(() => {
      API.init({
        env: 'staging',
        token: robot.token,
      })
    })


    it('CreateSuccess', async () => {
      const talk = new Talk({
        text: 'test-text-1',
      })
      const res = await talk.create()
      expect(res.status).toEqual(201)
      const item = await res.json()
      expect(item.text).toEqual(talk.text)
    })

    it('Invalid', async () => {
      let error = null
      try {
        new Talk({})
      } catch (e) {
        error = e
      }

      expect(error).not.toBeNull()
      expect(error.message).toBe('text should not be empty')
    })
  })

  describe('Authorization', () => {
    beforeEach(() => {
      API.init({
        env: 'staging',
        token: '',
      })
    })

    it('Unauthorized', async () => {
      const talk = new Talk({ text: 'test-text' })
      const res = await talk.create()
      expect(await res.json()).toEqual({
        message: 'JsonWebTokenError: jwt must be provided',
      })
      expect(res.status).toEqual(403)
    })
  })
})
