function Employee(firstName, lastName, experience, baseSalary) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.experience = experience;
  this.baseSalary = baseSalary;
};


Employee.prototype.getSalary = function () {
  let countedSalary = this.baseSalary;
  if (this.experience >= 2 && this.experience < 5) {
    countedSalary = countedSalary + 200;
  }
  else if (this.experience >= 5) {
    countedSalary = countedSalary * 1.2 + 500;
  }
  return countedSalary;
}


Employee.prototype.giveSalary = function () {
  return document.write("<p>" + this.firstName + " " + this.lastName + " отримує " + this.getSalary() + " шекелей " + "</p>")
}


function Developer(firstName, lastName, experience, baseSalary) {
  Employee.call(this, firstName, lastName, experience, baseSalary);
}


Developer.prototype = Object.create(Employee.prototype);


function Designer(firstName, lastName, experience, baseSalary, coef) {
  Employee.call(this, firstName, lastName, experience, baseSalary);
  this.coef = coef;
};


Designer.prototype = Object.create(Employee.prototype);

Designer.prototype.getSalary = function () {
  let countedSalary = Employee.prototype.getSalary.call(this);
  return countedSalary * this.coef;
}


function Manager(firstName, lastName, experience, baseSalary, team) {
  Employee.call(this, firstName, lastName, experience, baseSalary);
  this.team = team;
};


Manager.prototype = Object.create(Employee.prototype);

Manager.prototype.getSalary = function () {
  let countedSalary = Employee.prototype.getSalary.call(this);

  if (this.team.length >= 5 && this.team.length < 10) {
    countedSalary = countedSalary + 200;
  }
  else if (this.team.length >= 10) {
    countedSalary = countedSalary + 300;
  }

  let facSlaves = 0;
  for (key in this.team) {
    if (this.team[key] instanceof Developer) {
      facSlaves++;
    }
  }
  if (facSlaves > (this.team.length / 2)) {
    countedSalary = countedSalary * 1.1;
  }
  return countedSalary;
}


function Department() {
  this.managers = [];
}


Department.prototype.giveSalary = function () {
  this.managers.forEach(function (manager) {
    manager.giveSalary();
    manager.team.forEach(function (slaves) {
      slaves.giveSalary();
    });
  });
}


function main() {
  const dev1 = new Developer("Настя", "Шевченко", 2, 500);
  const dev2 = new Developer("Влад", "Мельник ", 5, 500);
  const dev3 = new Developer("Антон", "Бойко", 10, 500);
  const desig = new Designer("Никита", "Коваленко", 3, 1000, 0.5);
  const desig2 = new Designer("Сергей", "Бондаренко", 8, 1000, 1);
  const manager = new Manager("Андрей", "Гордиенко", 10, 1500, [dev1, dev2, dev3, desig, desig2]);

  const departmen = new Department();
  departmen.managers.push(manager);
  departmen.giveSalary();
}


main();