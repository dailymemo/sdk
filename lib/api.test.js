const API = require('./api')

const TEST_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0Y2ZjNmU2LTkzNGEtNGQ0Yy05YmVmLTA4MGNkZmY0NjQ4MyIsIm5hbWUiOiJnaWtpYXBwcm9ib3QiLCJwcm92aWRlciI6Imdpa2kiLCJwcm92aWRlclVzZXJJZCI6Imdpa2ktcm9ib3QtMSIsImlhdCI6MTYwNTUwNzk3MiwiZXhwIjoxNjA4MDk5OTcyfQ.veM_nm-tzKR_ZYZyjmwoAHjgzoPzH8jkFEQXqYp4c5g'

describe('API', () => {
  describe('Create', () => {
    it('CreateSuccessNormal -> QueryById', async () => {
      const api = new API({ env: 'staging', token: TEST_TOKEN })
      const talk = {
        text: 'test-text-1',
        tags: ['private'],
      }
      let res = await api.save('talk', talk)
      expect(res.status).toEqual(201)
      let item = await res.json()
      expect(item.text).toEqual(talk.text)
      expect(item.private).toEqual(true)

      const qs = { id: item.id }
      res = await api.query('talk', qs)
      expect(res.status).toEqual(200)
      item = await res.json()
      expect(item.text).toEqual(talk.text)
      expect(item.private).toEqual(true)
    })

    it('CreateSuccessChain', async () => {
      const talk = {
        text: 'test-text-1',
        tags: ['private'],
      }
      const res = await new API()
        .env('staging')
        .token(TEST_TOKEN)
        .save('talk', talk)
      expect(res.status).toEqual(201)
      const item = await res.json()
      expect(item.text).toEqual(talk.text)
      expect(item.private).toEqual(true)
    })

    it('Invalid', async () => {
      let error = null
      try {
        await new API()
          .env('staging')
          .token(TEST_TOKEN)
          .save('talk', {})
      } catch (e) {
        error = e
      }

      expect(error).not.toBeNull()
      expect(error.message).toBe('text should not be empty')
    })
  })

  describe('User', () => {
    it('LoginFailure', async () => {
      const res = await new API().login()
      expect(res.status).toEqual(400)
      expect(await res.json()).toEqual({
        message: 'providerUserId, provider and scene required',
      })
    })

    it('LoginSuccess', async () => {
      const res = await new API().token(TEST_TOKEN).login()
      expect(res.status).toEqual(200)
    })
  })
})
