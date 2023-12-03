import CalculatorService from "../services/CalculatorService";
export default class Calculator {

    static async requestCalculation(number, fieldId, cancelFlag) {
        const request = {
            number: number,
            fieldId: fieldId,
            cancelFlag: cancelFlag
        }

        await CalculatorService.calculate(request)
    }
    static async Canceletion(cancel, cancelFieldId){
        const request = {
            cancel: cancel,
            cancelFieldId: cancelFieldId
        }

        await CalculatorService.cancel(request)
    }
}