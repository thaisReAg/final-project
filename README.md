# PROYECTO-MID-TERM

## Table of Contents

- [Description](#description)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Features](#features)
- [Development Diary](#development-diary)
- [Reflective Insights](#reflective-insights)

## Description

This project is a task management application designed to help users organize their day-to-day activities. It allows users to create, edit, mark tasks as completed, and delete tasks. Additionally, it provides user authentication functionalities, including registration, login, and email verification.

This is a learning project for the Front End Web Developer bootcamp in IronHack.

[Presentation](https://docs.google.com/presentation/d/18xXNxPhKxIC7STnVi24tG2veae7cSMbaJg9wydjlt3g/edit?usp=sharing)

## Technologies Used

- Vue.js 3
- Supabase for authentication and database
- Vite
- Pinia for state management
- SASS for styling

## Usage

To see this project in action, visit [TaskingApp](https://taskingapp.netlify.app).

## Features

- User registration and login.
- Password recovery and email verification.
- Task creation, viewing, editing, and deletion.
- Task filtering by status (completed, pending).

## Development Diary

In this section, I share my daily progress on the project, including the features I implemented, the challenges encountered, and how I solved them.

### Day 1: [07-05-2024]

**Progress:**

- _Initial setup & Supabase integration_: We kickstarted by creating the application’s skeleton using Vue.js and Vite, and set up our connection to Supabase for user authentication. The setup included user registration and sign-in functionalities, essential for access control based on authentication.

- _Project organization_: The first day was also dedicated to structuring and organizing the project both visually and internally. This involved setting up the project directory, defining the folder structure, and planning out the Vue.js components. Given that this is my first solo project of this kind, establishing a clear and scalable structure from the get-go was imperative.

**Challenges encountered:**

- _Vue.js and Supabase integration difficulties_: Making Vue.js and Supabase work together smoothly took a lot of digging into technical docs and examples. I especially focused on adjusting the authentication process to make sure users have the best experience possible.

- _Lack of design assistance_: Not having access to a dedicated design team presented a unique challenge. It required me to seek inspiration from similar applications and explore UX/UI design examples extensively to craft a coherent and user-friendly interface.

**Solutions:**

- _Self-reliance for UX/UI Inspiration_: Compensated for the absence of a design team by independently researching design trends, analyzing competitive applications, and gathering UX/UI insights. This proactive approach facilitated the conceptualization of a visually appealing and intuitive interface.

### Day 2: [08-05-2024]

**Progress:**

- _Authentication components_: Developed two main components, SignIn and SignUp, to handle the user interface for registration and sign-in, respectively. Also set up a basic mechanism to switch between these components, offering users ease of navigation between sign-in and registration.

- _State management with Pinia_: Used Pinia for managing the application's state in Vue.js, creating stores to handle user data. This approach helped to maintain a clear separation between business logic and user interface, leading to a more robust application architecture.

**Challenges encountered:**

- _Registration and Sign-in Functionality_: Setting up the registration and sign-in features came with its own challenges. Even though I followed the documentation and examples, I hit several roadblocks, especially with getting these functions to work properly.

**Solutions:**

- The breakthrough came after a lot of trial and error, digging deep into JavaScript and Supabase documentation, and getting insights from friends, instructors, and AI. This process showed us the importance of persistence, the value of learning together, and how useful accessible documentation and community support can be.

**In-Progress Efforts:**

- _Notification Mechanism_: Started working on a way to send users a heads-up after they register, reminding them to verify their email. Even though putting a lot of effort into it, we're still figuring out how to get the notification system up and running smoothly. We're still at it, exploring different strategies and solutions to make sure users get the message without a hitch and have a great registration experience.

### Day 3: [09-05-2024]

**Progress:**

- _User Registration Notification_: A notification popup has been implemented to inform the user that the registration has been successfully completed and that they should verify their account via email.

- _Task Creation and Visualization_: Successful creation and display of tasks on the screen.

- _Task Deletion Feature_: Implemented functionality for users to delete tasks.

**Challenges Encountered:**

- _Task List Update Issue_: Faced an issue where, upon creating new tasks, they would not automatically be added to the list visible to the user, necessitating a manual page reload to see the changes.

**Solutions:**

- _Dynamic Task List Update_: The issue with the task list not updating was resolved by re-implementing the fetch of the tasks after their creation, allowing the list to dynamically update without the need to reload the page.

**In-Progress Efforts:**

- _User-Specific Task Isolation_: We are currently working on isolating tasks displayed so they are specific to each user, thereby preventing tasks from being shared among all users of the application. This will enable a more personalized experience for each user.

### Day 4: [10-05-2024]

**Progress:**

- _User-Specific Task Visibility_: Fixed an issue that caused the tasks of all users to be displayed; now, only the tasks of the logged-in user are shown.
- _Task Editing Capability_: Implemented functionality allowing tasks to be editable.
- _Peer Support_: Assisted colleagues with their code, providing solutions and suggestions.

**Challenges Encountered:**

- _Making Tasks Editable_: Encountered difficulties in implementing a user-friendly, efficient way to make tasks editable, leading to a solution that initially did not meet expectations.

**Solutions:**

- _Simplified Task Editing_: After observing how the instructor assisted a peer, learned a new, simpler method to make tasks editable. I adapted this approach into my code, resulting in a more straightforward and effective solution.

**In-Progress Efforts:**

- _Task Organization by Status_: Began organizing tasks into categories of 'Started' and 'Not Started' to enhance user interaction and visibility. Progress on this feature remains limited but is a main focus going forward.

### Day 5: [13-05-2024]

**Progress:**

- _Tasks Have States Now_: I made it so tasks can have different states (like done, to do, etc.) and you can change them.
- _Tasks in Columns_: Displayed tasks in columns based on their state. Looks more organized now.
- _Profile Page Works_: Managed to display user information on the profile page, making it editable and applying basic styling for improved user experience.

**Challenges Encountered:**

- _Profile Info Was Tough_: Getting the profile info to show up and be editable took me the whole day.

**Solutions:**

- _Got Profile Stuff Working_: I managed to get the profile info showing and editable. Still, I'm not 100% clear on how I did it.

**In-Progress Efforts:**

- _Personal Profiles for Everyone_: After getting the basic profile to work, I need to make sure each user gets their own personal profile. This includes people who just signed up and those who already have an account. The goal is to make the profile stuff work well for everyone.

### Day 6: [14-05-2024]

**Progress:**

- _User-Specific Profiles For Manually Created Users_: Users can now see their own profiles, but this is currently limited to the users I manually created in the database. New users still don't have a profile linked to their account automatically.
- _Responsive Web Design_: Made almost all parts of the website responsive and tweaked some designs to improve the look and feel of the site.

**Challenges Encountered:**

- _Struggles With Responsive CSS_: Faced some tough battles with making the CSS responsive. It was pretty frustrating.
- _New User Profile Creation_: Really struggled to automate profile creation for new users at the time of their account creation. I know the issue has something to do with how the user ID is captured, but it's been tough to pin down the exact problem.
- _Account Creation Limit_: Hit a temporary block on creating more accounts on Supabase because I reached the limit, which has slowed down my ability to test and fix issues.

**Solutions:**

- **In-Progress Efforts:**

- _Troubleshooting Profile Creation On SignUp_: Still trying to figure out why the function to create a profile during the signUp process isn't launching. I'm pretty sure it's related to how the user ID is being fetched, but I can't quite crack it. Plus, not being able to create more accounts for the time being due to the limit issue is making it harder to test potential fixes.

### Day 7: [15-05-2024]

**Progress:**

- _Automatic Profile Creation With Account_: Achieved automatic creation of a user profile linked to each new account upon registration. This ensures every user has their own space from the get-go.
- _Project Milestones Completed_: Completed all mandatory aspects of the project. Spent the day focusing on deploying the application, writing the README, and preparing the project presentation.

**Activities Planned Until Presentation:**

- _Web Design Enhancement_: Plan to refine the website's design, making it more visually appealing and user-friendly.
- _Drag-and-Drop Cards_: Want to enable moving cards by simply dragging them from one column to another, improving the user experience.
- _Card Priority Implementation_: Looking to add a feature to set priorities for tasks, helping users to manage their tasks more effectively.
- _Pomodoro Section Addition_: Considering the addition of a Pomodoro timer section to aid in time management and productivity.

## Reflective Insights

Reflecting on the journey of developing this project brought to light several key insights and learning moments. Here are some of the highlights and areas for future exploration:
