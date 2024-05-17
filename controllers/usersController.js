const profile = (req, res) => {
  return res.render('user_profile', {
    title: "userProfile"
  })
};

module.exports = {
  profile,
};
