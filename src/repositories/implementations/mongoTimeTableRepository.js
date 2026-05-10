class mongoTimeTableRepository extends ITimeTableRepository {
    async create(timeTableData) {
        return await this.timeTableModel.create(timeTableData);
    }
}

export default mongoTimeTableRepository;
