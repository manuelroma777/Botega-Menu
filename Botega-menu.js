// Botega-Menu-Script
<script>
        // Menús del restaurante
        const breakfastMenu = {
            "Pancakes": 5.00,
            "Omelette": 6.50,
            "French Toast": 5.50
        };

        const lunchDinnerMenu = {
            "Burger": 8.00,
            "Salad": 7.00,
            "Sandwich": 6.50
        };

        const sidesMenu = {
            "Fries": 2.50,
            "Soup": 3.00,
            "Salad": 2.50,
            "Fruit": 2.00
        };

        const customizationOptions = {
            "Pancakes": {
                "Extra syrup": 0.50,
                "Whipped cream": 0.75
            },
            "Omelette": {
                "Extra cheese": 1.00,
                "Mushrooms": 0.75
            },
            "French Toast": {
                "Extra cinnamon": 0.50,
                "Fruit topping": 1.00
            },
            "Burger": {
                "Cheese": 1.00,
                "Bacon": 1.50
            },
            "Salad": {
                "Chicken": 2.00,
                "Avocado": 1.50
            },
            "Sandwich": {
                "Extra meat": 2.00,
                "Cheese": 1.00
            },
            "Fries": {
                "Cheese": 0.50,
                "Bacon bits": 0.75
            },
            "Soup": {
                "Extra croutons": 0.50,
                "Cheese": 0.75
            },
            "Salad": {
                "Extra dressing": 0.50,
                "Nuts": 0.75
            },
            "Fruit": {
                "Honey": 0.50,
                "Yogurt": 1.00
            }
        };

        // Función para mostrar el menú
        function showMenu(menu) {
            let menuString = "";
            for (let item in menu) {
                menuString += `${item}: $${menu[item].toFixed(2)}\n`;
            }
            return menuString;
        }

        // Función para obtener la selección del usuario
        function getUserSelection(menu, menuType) {
            let selection = prompt(`Please choose an item from the ${menuType} menu:\n${showMenu(menu)}`);
            while (!menu.hasOwnProperty(selection)) {
                selection = prompt(`Invalid choice. Please choose an item from the ${menuType} menu:\n${showMenu(menu)}`);
            }
            return selection;
        }

        // Función para obtener la personalización del usuario
        function getCustomization(item) {
            let customizations = customizationOptions[item];
            if (!customizations) return 0;

            let customizationChoice = prompt(`How would you like to customize your ${item}?\n${showMenu(customizations)}\nType 'None' for no customization.`);
            if (customizationChoice.toLowerCase() === 'none') return 0;

            while (!customizations.hasOwnProperty(customizationChoice)) {
                customizationChoice = prompt(`Invalid choice. How would you like to customize your ${item}?\n${showMenu(customizations)}\nType 'None' for no customization.`);
                if (customizationChoice.toLowerCase() === 'none') return 0;
            }

            alert(`You chose: ${customizationChoice}. ${waitressComment()}`);
            return customizations[customizationChoice];
        }

        // Función para hacer un comentario de la mesera
        function waitressComment() {
            const comments = [
                "Great choice!",
                "That sounds delicious!",
                "An excellent choice!",
                "A classic favorite!",
                "Yummy, you're going to love it!"
            ];
            return comments[Math.floor(Math.random() * comments.length)];
        }

        // Función para calcular el costo total
        function calculateTotalCost(entree, sides) {
            let totalCost = entree.price + entree.customizationCost;
            sides.forEach(side => totalCost += side.price + side.customizationCost);
            return totalCost;
        }

        // Programa principal
        alert("Welcome to Bottega Diner!");

        let mealType = prompt("Would you like Breakfast, Lunch, or Dinner?").toLowerCase();
        let menu;

        if (mealType === "breakfast") {
            menu = breakfastMenu;
        } else if (mealType === "lunch" || mealType === "dinner") {
            menu = lunchDinnerMenu;
        } else {
            alert("Invalid meal type. Defaulting to Lunch.");
            mealType = "lunch";
            menu = lunchDinnerMenu;
        }

        let entreeSelection = getUserSelection(menu, mealType);
        alert(`You selected: ${entreeSelection}. ${waitressComment()}`);
        let entreePrice = menu[entreeSelection];
        let entreeCustomizationCost = getCustomization(entreeSelection);

        // Selección de guarniciones
        let sidesSelections = [];
        for (let i = 0; i < 2; i++) {
            let sideSelection = getUserSelection(sidesMenu, "sides");
            alert(`You selected: ${sideSelection}. ${waitressComment()}`);
            let sideCustomizationCost = getCustomization(sideSelection);
            sidesSelections.push({ name: sideSelection, price: sidesMenu[sideSelection], customizationCost: sideCustomizationCost });
        }

        let totalCost = calculateTotalCost({ name: entreeSelection, price: entreePrice, customizationCost: entreeCustomizationCost }, sidesSelections);

        alert(`Your total cost is: $${totalCost.toFixed(2)}`);
    </script>