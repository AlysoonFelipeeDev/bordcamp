export function errorNotFound (entity) {
    return { 
        type: "notFound", 
        message: `${entity} não encontrado!`
    };
};

export function errorStockUnavailable() {
    return {
        type: "unprocessableEntity", 
        message: "Estoque desse jogo indisponível no momento!"
    }
};

export function errorRentalCompleted() {
    return {
        type: "unprocessableEntity", 
        message: "Este aluguel já está finalizado!"
    };
};

export function errorunfinishedRent() {
    return {
        type: "badRequest", 
        message: "Este Aluguel ainda não está finalizado!"
    };
};

export function errorConflict (entity) {
    return {
        type: "conflict",
        message: `Este ${entity} já está cadastrado!`
    };
}