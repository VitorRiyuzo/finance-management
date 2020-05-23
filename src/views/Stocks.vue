<template>
    <div class="container mt-2 h-100">
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <button class="btn btn-secondary btn-block" data-toggle="modal" data-target="#exampleModal">Add Negociação</button>
                    </div>
                    <div class="col">
                        <select class="form-control form-control">
                            <option>Compras</option>
                            <option>Vendas</option>
                        </select>
                    </div>
                </div>
                <hr>
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ação</th>
                        <th scope="col">Data</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Quant</th>
                        <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>HGLG</td>
                            <td>22/05/2020 10:30</td>
                            <td>Venda</td>
                            <td>R$10,00</td>
                            <td>3</td>
                            <td>R$30,00</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>HGLG</td>
                            <td>22/05/2020 10:30</td>
                            <td>Venda</td>
                            <td>R$10,00</td>
                            <td>3</td>
                            <td>R$30,00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row justify-content-end">
            <div class="card">
                <div class="card-body">
                    <h4>Total: R$:60,00</h4>
                </div>
            </div>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form action="">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Adicionar Negociação</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Selecione a Ação</label>
                                <select class="form-control form-control">
                                    <option>HGLG</option>
                                    <option>BIDI4</option>
                                </select>
                            </div>
                            <div class="form-group ">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                                    <label class="form-check-label" for="exampleRadios1">
                                        Compra
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                                    <label class="form-check-label" for="exampleRadios1">
                                        Venda
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Preço</label>
                                <input type="number" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Quantidade</label>
                                <input type="number" class="form-control">
                            </div>
                            <div class="form-group">
                                <fieldset disabled>
                                    <label>Total</label>
                                    <input type="number" value="300" class="form-control">
                                </fieldset>
                            </div>
                            <div class="form-group">
                                <label>Data</label>
                                <input type="date" class="form-control">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            <button type="submit" class="btn btn-primary">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
</style>