// ДРОП МЕНЮ (ДО РЕГИСТРАЦИИ)
document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.icon-profile__button');
    const menu = document.querySelector('.drop-menu-no-auth');
    const burgerItem = document.querySelector('.burger');
    
    button.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
    burgerItem.addEventListener('click', function() {
        menu.classList.remove('active');
    });
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !button.contains(event.target)) {
            menu.classList.remove('active');
        }
    });
});

// ОТКРЫТИЕ МОДАЛКИ РЕГИСТРАЦИИ
document.addEventListener('DOMContentLoaded', function() {
    const menuRegister = document.querySelectorAll('.drop-menu-no-auth__item.register');
    const modalRegister = document.querySelector('.modal-register');
    const modalRegisterBackground = document.querySelector('.modal-register-background');
    const modalLoginBackground = document.querySelector('.modal-login-background');
    const librarySignUpButton = document.querySelectorAll('.signup-button');
    const menu = document.querySelector('.drop-menu-no-auth');
    const close = document.querySelector('.modal-register-close');
    const loginFooter = document.querySelectorAll('.login-button-register');
    const modalLogin = document.querySelector('.modal-login');

    menuRegister.forEach(function(item) {
      item.addEventListener('click', function() {
        modalRegisterBackground.classList.add('active');
        modalRegister.classList.add('active');
        menu.classList.remove('active');
      });
    });

    modalRegisterBackground.addEventListener('click', function() {
        modalRegisterBackground.classList.remove('active');
        modalRegister.classList.remove('active');
    });

    modalRegister.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    close.addEventListener('click', function() {
        modalRegisterBackground.classList.remove('active');
        modalRegister.classList.remove('active');
    });

    loginFooter.forEach(function(item) {
        item.addEventListener('click', function() {
            modalLoginBackground.classList.add('active');
            modalLogin.classList.add('active');
            modalRegisterBackground.classList.remove('active');
            modalRegister.classList.remove('active');
        });
    });

    librarySignUpButton.forEach(function(item) {
        item.addEventListener('click', function() {
            modalRegisterBackground.classList.add('active');
            modalRegister.classList.add('active');
            menu.classList.remove('active');
        });
    });
});

// ВАЛИДАЦИЯ ФОРМЫ РЕГИСТРАЦИИ + ЗАНЕСЕНИЕ ДАННЫХ С ФОРМЫ В LOCALSTORAGE
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('modal-register-form');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password-register');
    const signUpButton = document.getElementById('signup-button-register');

    form.addEventListener('submit', function(event) {
        let isValid = true;

        const errorElements = document.querySelectorAll('.modal-register-error');
        errorElements.forEach(function(errorElement) {
            errorElement.textContent = '';
        });

        if (firstNameInput.value.trim() === '') {
            isValid = false;
            document.querySelector('.firstname-error').textContent = 'First name is required';
        }

        if (lastNameInput.value.trim() === '') {
            isValid = false;
            document.querySelector('.lastname-error').textContent = 'Last name is required';
        }

        if (emailInput.value.trim() === '') {
            isValid = false;
            document.querySelector('.email-error').textContent = 'E-mail is required';
        } else {
            let existingUsers = localStorage.getItem('registeredUsers');
            let users = existingUsers ? JSON.parse(existingUsers) : [];
            
            const existingEmail = users.find(user => user.email === emailInput.value.trim());
            if (existingEmail) {
                isValid = false;
                document.querySelector('.email-error').textContent = 'This e-mail has already been entered';
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                document.querySelector('.email-error').textContent = 'Invalid e-mail address';
            }
        }

        if (passwordInput.value.trim() === '') {
            isValid = false;
            document.querySelector('.password-register-error').textContent = 'Password is required';
        } else if (passwordInput.value.length < 8) {
            isValid = false;
            document.querySelector('.password-register-error').textContent = 'Must be at least 8 symbols long';
        }

        if (!isValid) {
            event.preventDefault();
        }

        function generateRandomHexNumber(length) {
            let result = '';
            const characters = '0123456789ABCDEF';
        
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters.charAt(randomIndex);
            }
        
            return result;
        }

        if (isValid) {
            let newUser = {
                firstname: firstNameInput.value.trim(),
                lastname: lastNameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value.trim(),
                cardNumber: generateRandomHexNumber(9),
                isRegistred: true,
                isAuthorized: true,
                visits: 1,
                bonuses: 1240,
                books: 0,
                isSubscribed: false
            };
            let users = existingUsers ? JSON.parse(existingUsers) : [];
            users.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(users));
        } else {
            event.preventDefault();
        }
    });

    const closeModalButton = document.querySelector('.modal-register-close');
    const modalRegisterBackground = document.querySelector('.modal-register-background');
    const loginFooter = document.querySelectorAll('.login-button-register');
    
    closeModalButton.addEventListener('click', function() {
        const errorElements = document.querySelectorAll('.modal-register-error');
        errorElements.forEach(function(errorElement) {
            errorElement.textContent = '';
        });
    });

    modalRegisterBackground.addEventListener('click', function() {
        const errorElements = document.querySelectorAll('.modal-register-error');
        errorElements.forEach(function(errorElement) {
            errorElement.textContent = '';
        });
    });

    loginFooter.forEach(function(item) {
        item.addEventListener('click', function() {
            const errorElements = document.querySelectorAll('.modal-register-error');
            errorElements.forEach(function(errorElement) {
                errorElement.textContent = '';
            });
        });
    });

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});

// ОТКРЫТИЕ МОДАЛКИ ВХОДА
document.addEventListener('DOMContentLoaded', function() {
    const menuLogin = document.querySelectorAll('.drop-menu-no-auth__item.login');
    const modalLogin = document.querySelector('.modal-login');
    const modalLoginBackground = document.querySelector('.modal-login-background');
    const modalRegisterBackground = document.querySelector('.modal-register-background');
    const libraryLogInButton = document.querySelectorAll('.login-button');
    const menu = document.querySelector('.drop-menu-no-auth');
    const close = document.querySelector('.modal-login-close');
    const registerFooter = document.querySelectorAll('.register-button-login');
    const modalRegister = document.querySelector('.modal-register');
    const buyButton = document.querySelectorAll('.favorites-section-book-button');

    menuLogin.forEach(function(item) {
      item.addEventListener('click', function() {
        modalLoginBackground.classList.add('active');
        modalLogin.classList.add('active');
        menu.classList.remove('active');
      });
    });

    modalLoginBackground.addEventListener('click', function() {
        modalLoginBackground.classList.remove('active');
        modalLogin.classList.remove('active');
    });

    modalLogin.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    close.addEventListener('click', function() {
        modalLoginBackground.classList.remove('active');
        modalLogin.classList.remove('active');
    });

    registerFooter.forEach(function(item) {
        item.addEventListener('click', function() {
        modalRegisterBackground.classList.add('active');
        modalRegister.classList.add('active');
        modalLoginBackground.classList.remove('active');
        modalLogin.classList.remove('active');
        });
    });

    libraryLogInButton.forEach(function(item) {
        item.addEventListener('click', function() {
            modalLoginBackground.classList.add('active');
            modalLogin.classList.add('active');
            menu.classList.remove('active');
        });
    });
});

// ВАЛИДАЦИЯ ФОРМЫ ВХОДА (С УЧЕТОМ LOCALSTORAGE)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('modal-login-form');
    const emailOrCardInput = document.getElementById('email-or-card');
    const passwordInput = document.getElementById('password-login');
    const signUpButton = document.getElementById('login-button-login');
    const storedUsersJSON = localStorage.getItem('registeredUsers');

    form.addEventListener('submit', function(event) {
        let isValid = true;

        const errorElements = document.querySelectorAll('.modal-login-error');
        errorElements.forEach(function(errorElement) {
            errorElement.textContent = '';
        });

        if (emailOrCardInput.value.trim() === '') {
            isValid = false;
            document.querySelector('.email-or-card-error').textContent = 'E-mail or readers card is required';
        }

        if (passwordInput.value.trim() === '') {
            isValid = false;
            document.querySelector('.password-login-error').textContent = 'Password is required';
        } else if (passwordInput.value.length < 8) {
            isValid = false;
            document.querySelector('.password-login-error').textContent = 'Must be at least 8 symbols long';
        }

        if (isValid) {
            if (storedUsersJSON) {
                const storedUsers = JSON.parse(storedUsersJSON);
                const enteredEmailOrCard = emailOrCardInput.value.trim();
                const enteredPassword = passwordInput.value.trim();
            
                const user = storedUsers.find(userData => userData.email === enteredEmailOrCard || userData.cardNumber === enteredEmailOrCard);
            
                if (user && user.password === enteredPassword) {
                    user.isAuthorized = true;
                    user.visits += 1;
                    localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
                } else {
                    isValid = false;
                    document.querySelector('.password-login-error').textContent = 'Invalid email/card or password';
                }
            }
            if (!isValid) {
                event.preventDefault();
            }
        } else {
            event.preventDefault();
        }
    });

    const closeModalButton = document.querySelector('.modal-login-close');
    const modalLoginBackground = document.querySelector('.modal-login-background');
    const registerFooter = document.querySelectorAll('.register-button-login');

    closeModalButton.addEventListener('click', function() {
        const errorElements = document.querySelectorAll('.modal-login-error');
        errorElements.forEach(function(errorElement) {
            errorElement.textContent = '';
        });
    });

    modalLoginBackground.addEventListener('click', function() {
        const errorElements = document.querySelectorAll('.modal-login-error');
        errorElements.forEach(function(errorElement) {
            errorElement.textContent = '';
        });
    });

    registerFooter.forEach(function(item) {
        item.addEventListener('click', function() {
            const errorElements = document.querySelectorAll('.modal-login-error');
            errorElements.forEach(function(errorElement) {
                errorElement.textContent = '';
            });
        });
    });
});

// СОСТОЯНИЕ АВТОРИЗАЦИИ
const storedUsersJSON = localStorage.getItem('registeredUsers');
const profileIcon = document.querySelector('.icon-profile');
const profileIconRegistred = document.querySelector('.icon-profile-registred');
const registredButton = document.querySelector('.icon-profile-registred__button');
const registredText = document.querySelector('.icon-profile-registred__text');
const profileTitle = document.querySelector('.drop-menu-auth-title');
const libraryRightContent = document.querySelector('.library-card-right-content');
const libraryRightTitle = document.querySelector('.library-card-right-title');
const libraryRightSignUp = document.querySelector('.signup-button');
const libraryRightLogIn = document.querySelector('.login-button');
const libraryProfile = document.querySelector('.profile-button');
const libraryRightButtons = document.querySelector('.library-card-right-buttons');
const libraryLeftTitle = document.querySelector('.library-left-title');
const libraryLeftTitleAuthorized = document.querySelector('.library-left-title-authorized');
const nameInput = document.querySelector('.library-card-form-name');
const cardInput = document.querySelector('.library-card-form-card');
const checkCardBtn = document.querySelector('.library-card-form-submit');
const libraryCardProfileIcons = document.querySelector('.library-cards-profile');
const libraryCardProfileVisits = document.querySelector('.library-cards-profile__item.visits');
const libraryCardProfileBonuses = document.querySelector('.library-cards-profile__item.bonuses');
const libraryCardProfileBooks = document.querySelector('.library-cards-profile__item.books');


if (storedUsersJSON) {
    const storedUsers = JSON.parse(storedUsersJSON);

    for (const user of storedUsers) {
        if (user.isAuthorized === true) {
            profileIcon.style.display = 'none';
            profileIconRegistred.style.display = 'flex';
            registredButton.setAttribute('title', `${user.firstname} ${user.lastname}`);
            registredText.textContent = user.firstname.charAt(0) + user.lastname.charAt(0);
            profileTitle.textContent = user.cardNumber;
            libraryRightContent.textContent = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
            libraryRightTitle.textContent = 'Visit your profile';
            libraryRightSignUp.style.display = 'none';
            libraryRightLogIn.style.display = 'none';
            libraryProfile.style.display = 'block';
            libraryLeftTitle.style.display = 'none';
            libraryLeftTitleAuthorized.style.display = 'block';
            nameInput.setAttribute('value', `${user.firstname} ${user.lastname}`);
            nameInput.disabled = true;
            cardInput.setAttribute('value', `${user.cardNumber}`);
            cardInput.disabled = true;
            checkCardBtn.style.display = 'none';
            libraryCardProfileVisits.textContent = user.visits;
            libraryCardProfileBonuses.textContent = user.bonuses;
            libraryCardProfileBooks.textContent = user.books;
            libraryCardProfileIcons.style.display = 'flex';
            break;
        }
    }

    const logOut = document.querySelectorAll('.drop-menu-auth__item.logout');

    logOut.forEach(function(item) {
        item.addEventListener('click', function() {
            for (const user of storedUsers) {
                if (user.isAuthorized === true) {
                    user.isAuthorized = false;
                    localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
                    profileIcon.style.display = 'flex';
                    profileIconRegistred.style.display = 'none';
                    libraryRightContent.textContent = 'You will be able to see a reader card after logging into account or you can register a new account';
                    libraryRightTitle.textContent = 'Get a reader card';
                    libraryRightSignUp.style.display = 'block';
                    libraryRightLogIn.style.display = 'block';
                    libraryProfile.style.display = 'none';
                    libraryLeftTitle.style.display = 'block';
                    libraryLeftTitleAuthorized.style.display = 'none';
                    nameInput.setAttribute('value', ``);
                    cardInput.setAttribute('value', ``);
                    nameInput.disabled = false;
                    cardInput.disabled = false;
                    checkCardBtn.style.display = 'block';
                    libraryCardProfileIcons.style.display = 'none';
                    location.reload();
                    break;
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.icon-profile-registred__button');
    const menu = document.querySelector('.drop-menu-auth');
    const burgerItem = document.querySelector('.burger');
    
    button.addEventListener('click', function() {
        menu.classList.toggle('active');
    });

    burgerItem.addEventListener('click', function() {
        menu.classList.remove('active');
    });

    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !button.contains(event.target)) {
            menu.classList.remove('active');
        }
    });
});

// ВАЛИДАЦИЯ + РЕАЛИЗАЦИЯ LIBRARY CARD
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('library-card-form');
    const readersNameInput = document.getElementById('library-card-form-name');
    const cardNumberInput = document.getElementById('library-card-form-card');
    const errorFirstName = document.querySelector('.library-card-input-error.first');
    const errorCardNumber = document.querySelector('.library-card-input-error.second');
    const storedUsersJSON = localStorage.getItem('registeredUsers');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const errorElements = [errorFirstName, errorCardNumber];
        errorElements.forEach(function(errorElement) {
            errorElement.textContent = '';
        });

        const enteredReadersName = readersNameInput.value.trim();
        const enteredCardNumber = cardNumberInput.value.trim();

        let anyError = false;

        if (enteredReadersName === '') {
            errorFirstName.textContent = "Reader's name is required";
            anyError = true;
        }

        if (enteredCardNumber === '') {
            errorCardNumber.textContent = 'Card number is required';
            anyError = true;
        }

        if (anyError) {
            return;
        }

        if (storedUsersJSON) {
            const storedUsers = JSON.parse(storedUsersJSON);
            let userFound = false;

            for (const user of storedUsers) {
                if (user.isRegistred === true) {
                    const storedName = user.firstname + ' ' + user.lastname;
                    const storedCardNumber = user.cardNumber;

                    if (enteredReadersName === storedName && enteredCardNumber === storedCardNumber) {
                        userFound = true;

                        const libraryLeftTitle = document.querySelector('.library-left-title');
                        const libraryLeftTitleAuthorized = document.querySelector('.library-left-title-authorized');
                        const libraryCardProfileVisits = document.querySelector('.library-cards-profile__item.visits');
                        const libraryCardProfileBonuses = document.querySelector('.library-cards-profile__item.bonuses');
                        const libraryCardProfileBooks = document.querySelector('.library-cards-profile__item.books');
                        const checkCardBtn = document.querySelector('.library-card-form-submit');

                        libraryLeftTitle.style.display = 'none';
                        libraryLeftTitleAuthorized.style.display = 'block';
                        readersNameInput.value = user.firstname + ' ' + user.lastname;
                        readersNameInput.disabled = true;
                        cardNumberInput.value = user.cardNumber;
                        cardNumberInput.disabled = true;
                        checkCardBtn.style.display = 'none';
                        libraryCardProfileVisits.textContent = user.visits;
                        libraryCardProfileBonuses.textContent = user.bonuses;
                        libraryCardProfileBooks.textContent = user.books;

                        const libraryCardProfileIcons = document.querySelector('.library-cards-profile');
                        libraryCardProfileIcons.style.display = 'flex';

                        setTimeout(function() {
                            libraryLeftTitle.style.display = 'block';
                            libraryLeftTitleAuthorized.style.display = 'none';
                            readersNameInput.value = '';
                            cardNumberInput.value = '';
                            readersNameInput.disabled = false;
                            cardNumberInput.disabled = false;
                            checkCardBtn.style.display = 'block';
                            libraryCardProfileIcons.style.display = 'none';
                        }, 10000);

                        break;
                    }
                }
            }

            if (!userFound) {
                errorCardNumber.textContent = "Invalid reader's name or card number";
            }
        } else {
            errorCardNumber.textContent = 'No registered users found';
        }
    });
});

// ОТКРЫТИЕ МОДАЛКИ MY PROFILE
document.addEventListener('DOMContentLoaded', function() {
    const myProfileBtn = document.querySelectorAll('.drop-menu-auth__item.myprofile')
    const modalProfile = document.querySelector('.modal-profile');
    const modalProfileBackground = document.querySelector('.modal-profile-background');
    const libraryProfileBtn = document.querySelectorAll('.profile-button');
    const menu = document.querySelector('.drop-menu-auth');
    const close = document.querySelector('.modal-profile-close');

    myProfileBtn.forEach(function(item) {
      item.addEventListener('click', function() {
        modalProfileBackground.classList.add('active');
        modalProfile.classList.add('active');
        menu.classList.remove('active');
      });
    });

    modalProfileBackground.addEventListener('click', function() {
        modalProfileBackground.classList.remove('active');
        modalProfile.classList.remove('active');
    });

    modalProfile.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    close.addEventListener('click', function() {
        modalProfileBackground.classList.remove('active');
        modalProfile.classList.remove('active');
    });

    libraryProfileBtn.forEach(function(item) {
        item.addEventListener('click', function() {
            modalProfileBackground.classList.add('active');
            modalProfile.classList.add('active');
            menu.classList.remove('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() { // ИСПОЛЬЗОВАНИЕ ДАННЫХ ИЗ LOCALSTORAGE ДЛЯ ФОРМИРОВАНИЯ ИНФОРМАЦИИ О ПРОФИЛЕ ТЕКУЩЕГО ЮЗЕРА
    const storedUsersJSON = localStorage.getItem('registeredUsers');

    if (storedUsersJSON) {
        const storedUsers = JSON.parse(storedUsersJSON);

        for (const user of storedUsers) {
            if (user.isAuthorized === true) {
                const profileAvatar = document.querySelector('.modal-profile-avatar');
                const profileName = document.querySelector('.modal-profile-name');
                const visitsItem = document.querySelector('.library-cards-profile__item.visits.modal');
                const bonusesItem = document.querySelector('.library-cards-profile__item.bonuses.modal');
                const booksItem = document.querySelector('.library-cards-profile__item.books.modal');
                const profileCardNumber = document.querySelector('.modal-profile-card-number-cpy');
                
                profileAvatar.textContent = user.firstname.charAt(0) + user.lastname.charAt(0);
                profileName.textContent = user.firstname + ' ' + user.lastname;
                visitsItem.textContent = user.visits;
                bonusesItem.textContent = user.bonuses;
                booksItem.textContent = user.books;
                profileCardNumber.setAttribute('value', user.cardNumber);

                profileCardNumber.addEventListener('click', function() {
                    const textToCopy = user.cardNumber;
                    copyTextToClipboard(textToCopy);
                    alert('Copied to clipboard!');
                });
            
                function copyTextToClipboard(text) {
                    const textarea = document.createElement('textarea');
                    textarea.value = text;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                }
            }
        }
    }
}

// ОБНУЛЕНИЕ КОЛ-ВА КНИГ
,window.addEventListener('beforeunload', function() {
    let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  
    users.forEach(function(user) {
      user.books = 0;
    });

    localStorage.setItem('registeredUsers', JSON.stringify(users));
}));

// ОТРАБОТКА НАЖАТИЯ КНОПКИ BUY
document.addEventListener('DOMContentLoaded', function() {
    const modalBuy = document.querySelector('.modal-buy');
    const modalBuyBackground = document.querySelector('.modal-buy-background');
    const modalLogin = document.querySelector('.modal-login');
    const modalLoginBackground = document.querySelector('.modal-login-background');
    const close = document.querySelector('.modal-buy-close');
    const buyButton = document.querySelectorAll('.favorites-section-book-button');
    const storedUsersJSON = localStorage.getItem('registeredUsers');

    if (storedUsersJSON) {
        const storedUsers = JSON.parse(storedUsersJSON);
        storedUsers.books = 0;
        const authorizedUser = storedUsers.find(user => user.isAuthorized === true);
        const subscribedUser = storedUsers.find(user => user.isSubscribed === true && user.isAuthorized === true);

        buyButton.forEach(function(item) {
            item.addEventListener('click', function() {
                if (authorizedUser && subscribedUser) {
                    item.classList.remove('favorites-section-book-button');
                    item.classList.add('favorites-bot-right-book-button');
                    item.textContent = 'Own';
                    if (storedUsersJSON) {
                        for (const user of storedUsers) {
                            if (user.isAuthorized === true) {
                                user.books += 1;
                                const booksCard = document.querySelector('.library-cards-profile__item.books');
                                const booksProfile = document.querySelector('.library-cards-profile__item.books.modal');
                                booksCard.textContent = user.books;
                                booksProfile.textContent = user.books;
                            }
                        }
                        localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
                    }
                } else if (authorizedUser) {
                    modalBuyBackground.classList.add('active');
                    modalBuy.classList.add('active');
                }
                else {
                    modalLoginBackground.classList.add('active');
                    modalLogin.classList.add('active');
                }
            });
        });
    }
    
    modalBuyBackground.addEventListener('click', function() {
        modalBuyBackground.classList.remove('active');
        modalBuy.classList.remove('active');
    });

    modalBuy.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    close.addEventListener('click', function() {
        modalBuyBackground.classList.remove('active');
        modalBuy.classList.remove('active');
    });

    const form = document.getElementById('modal-buy-form');
    const cardNumberInput = document.getElementById('modal-buy-card-number');
    const expirationCode1Input = document.getElementById('modal-buy-expiration-code1');
    const expirationCode2Input = document.getElementById('modal-buy-expiration-code2');
    const cvcInput = document.getElementById('modal-buy-cvc');
    const cardholderInput = document.getElementById('modal-buy-cardholder');
    const postalCodeInput = document.getElementById('modal-buy-postal-code');
    const cityInput = document.getElementById('modal-buy-city');
    
    const errorContainer = document.getElementsByClassName('modal-buy-error');
    
    function showError(input, errorMessage) {
        const errorElement = input.nextElementSibling;
        errorElement.innerText = errorMessage;
    }
    
    function clearError(input) {
        const errorElement = input.nextElementSibling;
        errorElement.innerText = '';
    }
    
    function isNumeric(str) {
        return /^\d+$/.test(str);
    }
    
    form.addEventListener('submit', function (event) {
        event.preventDefault();
    
        for (let i = 0; i < errorContainer.length; i++) {
            errorContainer[i].innerText = '';
        }
    
        let isValid = true;
    
        if (cardNumberInput.value.length !== 16 || !isNumeric(cardNumberInput.value)) {
            showError(cardNumberInput, 'Card number must be 16 digits');
            isValid = false;
        }
    
        if (expirationCode1Input.value.length !== 2 || !isNumeric(expirationCode1Input.value) || !isNumeric(expirationCode2Input.value)) {
            showError(expirationCode1Input, 'Expiration code must contain 2 digits');
            showError(expirationCode2Input, 'Expiration code must contain 2 digits');
            isValid = false;
        }
    
        if (cvcInput.value.length !== 3 || !isNumeric(cvcInput.value)) {
            showError(cvcInput, 'CVC must be 3 digits');
            isValid = false;
        }
    
        if (cardholderInput.value.trim() === '') {
            showError(cardholderInput, 'Cardholder name is required');
            isValid = false;
        }
    
        if (postalCodeInput.value.trim() === '') {
            showError(postalCodeInput, 'Postal code is required');
            isValid = false;
        }
    
        if (cityInput.value.trim() === '') {
            showError(cityInput, 'City / Town is required');
            isValid = false;
        }
    
        if (isValid) {
            const storedUsersJSON = localStorage.getItem('registeredUsers');
            if (storedUsersJSON) {
                const storedUsers = JSON.parse(storedUsersJSON);
                for (const user of storedUsers) {
                    if (user.isAuthorized === true) {
                        user.isSubscribed = true;
                        localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
                        location.reload();
                    }
                }
            }
    
            const modalBuy = document.querySelector('.modal-buy');
            const modalBuyBackground = document.querySelector('.modal-buy-background');
    
            modalBuyBackground.classList.remove('active');
            modalBuy.classList.remove('active');
        }
    });
});

// БУРГЕР-МЕНЮ
(function () {
    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.nav-main');
    const menuClose = document.querySelector('.header-main__close');
    const menuLinks = document.querySelectorAll('.nav-main__link');

    burgerItem.addEventListener('click', () => {
        menu.classList.add('nav-main_active');
        menu.classList.toggle('active');

    });

    menuClose.addEventListener('click', () => {
        menu.classList.remove('nav-main_active');
    });

    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !burgerItem.contains(event.target)) {
            menu.classList.remove('nav-main_active');
        }
    });

    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            menu.classList.remove('nav-main_active');
        });
    });
}());

// КАРУСЕЛЬ (ПАГИНАЦИЯ)
const carousel = document.querySelector('.about-images');
const images = carousel.querySelectorAll('.about-images > div');
const buttons = document.querySelectorAll('.about-image-swapper button');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (window.innerWidth >= 1440) {
            images.forEach(image => {
                image.style.transform = `translateX(-${index * 106}%)`;
            });

            buttons.forEach(btn => {
                btn.classList.remove('active');
            });

            button.classList.add('active');
        } else if (window.innerWidth < 1440) {
            images.forEach(image => {
                image.style.transform = `translateX(-${index * 100}%)`;
            });

            buttons.forEach(btn => {
                btn.classList.remove('active');
            });

            button.classList.add('active');
        }
    });
});

// КАРУСЕЛЬ (СТРЕЛКИ)
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

prevButton.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, slideInterval);
    currentIndex = Math.max(currentIndex - 1, 0);
    goToSlide(currentIndex);
});

nextButton.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, slideInterval);
    currentIndex = Math.min(currentIndex + 1, 4);
    goToSlide(currentIndex);
});

// КАРУСЕЛЬ (АВТО)
let currentIndex = 0;
const slideInterval = 3500;

function goToSlide(index) {
    images.forEach(image => {
        if (window.innerWidth >= 1440) {
            image.style.transform = `translateX(-${index * 106}%)`;
        } else if (window.innerWidth < 1440) {
            image.style.transform = `translateX(-${index * 100}%)`;
        }
    });

    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    buttons[index].classList.add('active');
}

function nextSlide() {
    if (window.innerWidth >= 1440) {
        currentIndex = (currentIndex + 1) % 3;
        goToSlide(currentIndex);
    } else if (window.innerWidth < 1440 && window.innerWidth > 1024) {
        currentIndex = (currentIndex + 1) % 4;
        goToSlide(currentIndex);
    } else {
        currentIndex = (currentIndex + 1) % 5;
        goToSlide(currentIndex);
    }
}

let autoSlideInterval = setInterval(nextSlide, slideInterval);

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 3500);
        currentIndex = index;
        goToSlide(currentIndex);
    });
});

// СЛАЙДЕР (FAVORITES)
const radioButtons = document.querySelectorAll('.radio');
const sections1 = document.querySelectorAll('.favorites-sections');
const sections2 = document.querySelectorAll('.favorites-sections2');

radioButtons.forEach((radioButton, index) => {
  radioButton.addEventListener('change', () => {
    sections1.forEach(section => {
        section.classList.remove('active');
    });
    sections2.forEach(section => {
        section.classList.remove('active');
    });
    sections1[index].classList.add('active');

    sections2[index].classList.add('active');
  });
});
