# Ask Away
The project for the course ReactJS February2019 in SoftUni. In it's basis the app is a random question generator. On the home page an anonymous user can get a random question from the already posted ones, comment on the question and see other comments. There is also a field for entering a tag, which acts as a filter for the random question generator. A logged user can in addition to that rate the questions and answers, and an Admin user can delete answers.

On the profile of each logged user, he can post a new question, which then goes for approval by admin. With entering a question there is a space to enter tags for it as well. If any of the tags does not exist yet, it is created the moment when the question is created. A user may also see all his questions and answers so far.

An admin panel is there for all admin users. In it they can see all unapproved questions which they can then approve and all users whichthey can ban or make admins.

The messaging and error handling is done via react-toastify.
All messages go through a special characters handler which prevents XSS attacks.
The server has CORS protection as well.
