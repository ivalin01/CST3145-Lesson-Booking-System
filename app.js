let lesson = new Vue({
    el: "#list-of-lessons",
    data: {
        show: true,
        allLessons: Lessons,
        cart: [],
        isCheckoutVisible: false,
        order: {
            FullName: "",
            PhoneNumber: "",
        }
    },
    methods: {

        //function to push lessons in the cart and update the spaces available
        addItemToCart: function (subject) {
            if (subject.lessonSpaces > 0) {
                this.cart.push({
                    id: subject.id,
                    name: subject.lessonName,
                    location: subject.lessonLocation,
                    price: subject.lessonPrice
                });
                subject.lessonSpaces--;
            }

        },

        /*function to count number of items per lesson id so that each lesson can be added to
        the cart the specified amout of times in the lessons.js 
        */
        cartCount(id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }

            }
            return count;
        },
        //function to check if item can be added to the cart to based on the lesson spaces
        canAddInCart(subject) {
            return subject.lessonSpaces > this.cartCount(subject.id);
        },

        showCheckout: function () {
            if (this.show) {
                this.show = false
            } else {
                this.show = true
            }
        },
        removeFromCart(item) {
            const match = this.allLessons.find(match => match.id === item.id);

            if (match && match.lessonSpaces >= 0) {
                match.lessonSpaces++;
                this.cart = this.cart.filter(cartItem => cartItem !== item);
            }
        },

    },

    computed: {
        //function to return the number of items in the cart
        itemsInCart: function () {
            return this.cart.length || "";
        },

    },

});


