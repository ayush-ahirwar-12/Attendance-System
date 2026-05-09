class mongoHolidayRepository {
    async createHoliday(holidayData) {
        return await this.holidayModel.create(holidayData);
    }
}

export default mongoHolidayRepository;