
const projectIDList= [];
const projectNames=[];
const hardCaps=[];
const dates=[];
const status=["ERROR", "ERROR", "ERROR"];
const investors=["72", "558", "155"];
const contractAddressList=["0xf1ce0a98efbfa3f8ebec2399847b7d88294a634e","0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae","0x52965F9BD9D0F2bbea9b5a9C155A455D0e58Fe25"];

const data1 = [
    {quarter: 1, earnings: 1300},
    {quarter: 2, earnings: 1350},
    {quarter: 3, earnings: 1425},
    {quarter: 4, earnings: 1455},
    {quarter: 5, earnings: 1475},
    {quarter: 6, earnings: 1605},
    {quarter: 7, earnings: 1655},
    {quarter: 8, earnings: 1900}
];
const data2 = [           
    {quarter: 1, earnings: 8000},
    {quarter: 2, earnings: 9500},
    {quarter: 3, earnings: 10250},
    {quarter: 4, earnings: 12550},
    {quarter: 5, earnings: 14750},
    {quarter: 6, earnings: 16050},
    {quarter: 7, earnings: 16550},
    {quarter: 8, earnings: 19000}
];
const data3 = [
    {quarter: 1, earnings: 2000},
    {quarter: 2, earnings: 2200},
    {quarter: 3, earnings: 2650},
    {quarter: 4, earnings: 3250},
    {quarter: 5, earnings: 3750},
    {quarter: 6, earnings: 4050},
    {quarter: 7, earnings: 6350},
    {quarter: 8, earnings: 9000}
];

const dataArray = [data1, data2, data3];


export { dataArray, projectIDList, projectNames, hardCaps, dates, status, investors, contractAddressList }