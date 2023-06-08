'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = [
      {
        DiseaseId: 1,
        SymptompId: 3
      },
      {
        DiseaseId: 2,
        SymptompId: 4
      },
      {
        DiseaseId: 1,
        SymptompId: 5
      },
      {
        DiseaseId: 4,
        SymptompId: 10
      },
      {
        DiseaseId: 2,
        SymptompId: 6
      },
      {
        DiseaseId: 3,
        SymptompId: 6
      },
      {
        DiseaseId: 2,
        SymptompId: 5
      },
    ]

    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })


    await queryInterface.bulkInsert('DiseaseSymptomps', data)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("DiseaseSymptomps", null, {})
  }
};
