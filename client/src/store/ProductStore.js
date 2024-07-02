import {makeAutoObservable, toJS} from "mobx";

export default class ProductStore{
    constructor() {

        this._categories = []
        this._brands = []
        this._sizes = []
        this._materials = []

        this._order = undefined

        this._products = []
        this._premiumProducts = []

        this._startProducts = []

        this._seacrhBool = false

        this._selectedBrand=[]
        this._selectedCategories =[]
        this._selectedSize =[]
        this._selectedMaterial = []

        this._searchedProducts=[]

        this._firstProducts=[]

        this._page = 1
        this._totalCount = 0
        this._limit=9
        this._categoryResult = []

        this._colors = []

        this._sex = ['Мужчинам', 'Женщинам','Унисекс']

        this._selectedSex = []

        makeAutoObservable(this)
    }

    get sex(){
        return this._sex
    }
    get SelectedSex(){
        return this._selectedSex
    }
    setSelectedSex(sex){
        this._selectedSex = sex
    }
    SetColors(color){
        this._colors = color
    }
    get colors(){
        return this._colors
    }
    setCategoryResult(products){
        this._categoryResult = products
    }
    get CategoryResult(){
        return this._categoryResult
    }
    get searchResult(){
        return this._searchedProducts
    }
    setFirst(prods){
        this._firstProducts = prods
    }
    get First(){
        return this._firstProducts
    }
    setPage(page){
        this._page=page
    }
    setTotalCount(count){
        this._totalCount=count
    }
    get page(){
        return this._page
    }
    get totalCount(){
        return this._totalCount
    }
    get limit(){
        return this._limit
    }

    setSearchBool(Bool){
        this._seacrhBool=Bool
    }
    get searchBool(){
        return this._seacrhBool
    }
    setCategories(category){
        this._categories = category
    }
    setBrands(brand){
        this._brands = brand
    }
    setMaterials(material){
        this._materials = material
    }
    setSizes(size){
        this._sizes = size
    }

    setProducts(products){
        this._products = products
    }
    setStartProducts(products){
        this._startProducts = products
    }
    SetSearchedProducts(prods){
        // this._products = this._startProducts
        this._searchedProducts = prods
        // this._products = this._searchedProducts
        console.log(toJS(this._products),  toJS(this._searchedProducts), toJS(this._startProducts))
    }

    get StartProducts(){
        return this._startProducts
    }

    setPremiumProducts(premiumProducts){
        this._premiumProducts = premiumProducts
    }

    setOrder(order){
        this._order = order
    }
    get Order(){
        return this._order
    }

    setSelectedBrand(brand){
        this._selectedBrand = brand
    }
    setSelectedCategory(category){
        this._selectedCategories = category
    }
    setSelectedSize(size){
        this._selectedSize = size
    }
    setSelectedMaterial(mat){
        this._selectedMaterial = mat
    }

    get selectedBrand(){
        return this._selectedBrand
    }
    get SelectedSize(){
        return this._selectedSize
    }
    get SelectedMaterial(){
        return this._selectedMaterial
    }
    get SelectedCategory(){
        return this._selectedCategories
    }
    get categories(){
        return this._categories
    }
    get brands(){
        return this._brands
    }
    get materials(){
        return this._materials
    }
    get sizes(){
        return this._sizes
    }
    get products(){
        return this._products
    }

    get premiumProducts(){
        return this._premiumProducts
    }
}