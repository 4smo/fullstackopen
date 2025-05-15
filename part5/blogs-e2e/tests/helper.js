const loginWith = async (page, username, password)  => {
    await page.getByRole('button', { name: 'log in' }).click()
    await page.locator('div').filter({ hasText: /^username$/ }).getByRole('textbox').fill(username)
    await page.locator('div').filter({ hasText: /^password$/ }).getByRole('textbox').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}
  
const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'new blog' }).click();
    await page.locator('div').filter({ hasText: /^title:$/ }).getByRole('textbox').fill(title)
    await page.locator('div').filter({ hasText: /^author:$/ }).getByRole('textbox').fill(author)
    await page.locator('div').filter({ hasText: /^url:$/ }).getByRole('textbox').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
    await page.getByText(`${title} ${author}`).waitFor()
}
  
const logOut = async (page) => {
    await page.getByRole('button', { name: 'logout' }).click();
}

  export { loginWith, createBlog, logOut }