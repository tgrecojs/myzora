const isMobile = (req) =>
  req ? req.headers['user-agent'] : navigator.userAgent

export { isMobile }
