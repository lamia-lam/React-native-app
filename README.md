# BookBuddy 📚

### Read • Track • Achieve

BookBuddy is a personal reading companion mobile application built with **React Native, Expo, TypeScript, and Firebase**. It helps book lovers discover books, organize their personal reading libraries, and track their reading progress.

---

## 📱 About BookBuddy

BookBuddy provides a simple and organized way to manage your reading journey. Users can search for books using the Open Library API, save books to their personal library, organize them by reading status, and track their reading progress.

The application follows an MVC-inspired architecture to separate the user interface, application logic, data models, and data access responsibilities.

## ✨ Key Features

### 1. Authentication & User Profiles
- User registration and login using Firebase Authentication.
- User profile information stored in Cloud Firestore.
- Dedicated profile screen.
- Edit profile functionality.
- Logout with confirmation.

### 2. Home Dashboard
- Personalized welcome greeting.
- Reading statistics, including total books and completed books.
- Continue Reading section showing the most recently updated book in progress.
- Visual reading progress indicator.
- Recommended and trending books from Open Library.

### 3. Discover & Search Books
- Search for books by title or author.
- Book discovery powered by the Open Library API.
- Category and genre filtering.
- Trending and popular book selections.
- Loading and error handling when the book service is unavailable.

### 4. Book Details & Library Management
- View available book information, including title, author, cover, and publication year.
- Add discovered books to a personal library.
- Choose a reading status when adding a book.

### 5. Personal Reading Library
- View saved books in one place.
- Filter books by reading status:
  - All
  - Reading
  - Completed
  - Want to Read
- Update current reading page and total pages.
- Track reading progress using a progress bar.
- Delete books from the personal library.

---

## 🏗️ Architecture (MVC Pattern)

BookBuddy follows an MVC-inspired architecture to keep the code organized and maintainable.

The main responsibilities are:

- **Model:** Defines the application's data structures and TypeScript interfaces.
- **View:** Displays the user interface and handles visual presentation.
- **Controller:** Manages application logic, state, and user interactions.
- **Service:** Communicates with external APIs and Firebase services.

### Project Structure

```text
BookBuddy/
│
├── src/
│   ├── app/                  # Expo Router screens and routes
│   │
│   ├── models/               # Data models and TypeScript interfaces
│   │   ├── Book.ts
│   │   └── User.ts
│   │
│   ├── controllers/          # Application logic and custom hooks
│   │   ├── useLoginController.ts
│   │   ├── useRegisterController.ts
│   │   ├── useHomeController.ts
│   │   ├── useDiscoverController.ts
│   │   ├── useLibraryController.ts
│   │   ├── useBookDetailsController.ts
│   │   ├── useProfileController.ts
│   │   └── useEditProfileController.ts
│   │
│   ├── views/                # UI components and screens
│   │   ├── SplashView.tsx
│   │   ├── LoginView.tsx
│   │   ├── RegisterView.tsx
│   │   ├── HomeView.tsx
│   │   ├── DiscoverView.tsx
│   │   ├── LibraryView.tsx
│   │   ├── BookDetailsView.tsx
│   │   ├── ProfileView.tsx
│   │   ├── EditProfileView.tsx
│   │   │
│   │   └── components/       # Reusable UI components
│   │       ├── BottomTabBar.tsx
│   │       ├── BookCard.tsx
│   │       └── BookListCard.tsx
│   │
│   ├── services/             # API and Firebase operations
│   │   ├── authService.ts
│   │   ├── bookService.ts
│   │   └── libraryService.ts
│   │
│   └── config/
│       └── firebase.ts       # Firebase initialization
│
├── assets/                   # Images, fonts, and other assets
├── package.json
└── README.md
```

*Note: This is a simplified overview of the project structure. Your actual files may include additional components and configuration files.*

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| [React Native](https://reactnative.dev/) | Cross-platform mobile application development |
| [Expo](https://expo.dev/) | Development platform and build tools |
| [Expo Router](https://docs.expo.dev/router/introduction/) | File-based routing and navigation |
| [TypeScript](https://www.typescriptlang.org/) | Type safety and maintainable code |
| [Firebase Authentication](https://firebase.google.com/products/auth) | User registration and login |
| [Cloud Firestore](https://firebase.google.com/products/firestore) | User profiles and reading library data |
| [Open Library API](https://openlibrary.org/developers/api) | Book search and book information |
| [Lucide React Native](https://lucide.dev/) | Icons |
| [NativeWind](https://www.nativewind.dev/) | Utility-based styling, if configured in the project |
| [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins) | Typography |

---

## 🎨 Color Palette & Design

BookBuddy uses a calm, nature-inspired color palette to create a comfortable reading experience.

| Color | Hex Value | Usage |
|---|---|---|
| Mint | `#EAF9E7` | Background and screen surfaces |
| Light Green | `#C0E6BA` | Cards and avatar backgrounds |
| Primary Green | `#4CA771` | Buttons and active states |
| Dark Green | `#013237` | Headings and primary text |
| Gray | `#8A9A91` | Secondary text |
| Border | `#DCEBDD` | Borders and dividers |
| Error | `#DC5252` | Error messages |

---

## 🚀 Getting Started

Follow these steps to run BookBuddy on your local machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/lang/en/)
- [Git](https://git-scm.com/)
- [Expo Go](https://expo.dev/go/) or Android Studio for Android testing.

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

Move into the project directory:

```bash
cd BookBuddy
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Configure Firebase

BookBuddy uses Firebase Authentication and Cloud Firestore.

To connect your own Firebase project:

1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Create a Firebase project.
3. Enable Email/Password authentication.
4. Create a Cloud Firestore database.
5. Configure your Firebase project settings in `src/config/firebase.ts`.

**Important:** Configure appropriate Firestore Security Rules so that users can only access their own private library and profile data. Do not rely only on frontend checks for data security.

### 4. Start the Development Server

```bash
yarn start
```

If you need to clear the Metro bundler cache:

```bash
yarn start --clear
```

Then:

- Press `a` to open the app in an active Android emulator.
- Scan the QR code using Expo Go to run the app on a compatible physical device.
- Press `i` to open the iOS Simulator on macOS.

---

## 🧪 Useful Commands

| Command | Purpose |
|---|---|
| `yarn start` | Start the Expo development server |
| `yarn start --clear` | Start Expo with a cleared cache |
| `npx tsc --noEmit` | Check TypeScript errors |
| `npx expo lint` | Run Expo linting, if configured |
| `npx expo doctor` | Check project dependencies and configuration |

---

## 🔮 Future Improvements

Possible improvements for future versions include:

- Profile picture upload.
- Reading goals and daily reading reminders.
- Personalized book recommendations.
- Additional reading statistics.
- Improved book discovery and filtering.

---

## 📄 License

This project is intended for learning and development purposes.

If you choose to distribute it under an open-source license, add the appropriate license file to the repository and update this section accordingly.