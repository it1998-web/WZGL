<template>
    <div class="v-clock">
        <Card>
          <div class="left">
            <div>
              <div>
                <Button icon="ios-add" type="primary" @click="addDepartments">添加</Button>
              </div>
            </div>
            <div>
              <div>
                <Select v-model="search.organizationId" placeholder="请选择组织" :clearable="true" style="width: 300px;margin-left: 5px;" @on-change="changeOrg" :disabled="user.user.admin!=1">
                  <Option v-for="(item,index) in orgList"
                          :value="item.id"
                          :label="item.name"
                          :key="index">
                  </Option>
                </Select>
              </div>
              <div>
                <Select v-model="search.state" :clearable="true" placeholder="组织状态">
                  <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
              <div>
                <Input clearable v-model="search.query" placeholder="请输入组织名称关键字" />
              </div>
              <div>
                <Button type="primary" @click="doSearch">查询</Button>
              </div>
            </div>
          </div>


          <tableTemplate
            :tableList="tableList"
            :columns="columns"
            :page="page"
            :size="'small'"
            @changePage="changePage"
            @onRowClick="onRowClick"
            @onSelectionChange="onSelectionChange">
          </tableTemplate>
        </Card>



      <Modal
        v-model="managementModal"
        :title="managementTitle"
        :loading="managementLoading"
        :mask-closable="false"
        @on-ok="managementOk('managementUser')"
        @on-cancel="managementCancel"
        width="950"
        ok-text = '保存'
        cancel-text = '取消'>
        <organizationManagementForm
          ref="organizationManagementForm"
          :managementUser="managementUser"
          :managementItem="managementItem"
          @onChangeAdminName="onChangeAdminName"
          :pictureItem="pictureItem"
          @setImageListPicture="setImageListPicture"
          @delImageListPicture="delImageListPicture"
          @removeImageList="removeImageList">
        </organizationManagementForm>
      </Modal>
    </div>
</template>

<script>
  import { organizationsGetByPage,organizationInsert,getByPage,organizationsUpdate,organizationsDelete, getAllOrganizations } from '@/axios/api';
  import tableTemplate from '@/commonComponent/tableTemplate'
  import organizationManagementForm from './organizationManagementForm'
    export default {
        name: "organizationManagementIndex",
        components: {
          tableTemplate,
          organizationManagementForm,
        },
        props: [''],
        data() {
            return {

              search:{
                organizationId:null,
                state: '',
                query: '',
              },
              orgList:[],
              stateList: [
                {
                  value: 0,
                  label: '有效'
                },
                {
                  value: 1,
                  label: '注销'
                },
              ],


              tableList:{},
              page:{
                current:1,
              },
              columns: [
                {
                  title:'序号',
                  type: 'index',
                  width: 80,
                  align: 'center'
                },
                {
                  title: '组织代码',
                  key: 'code',
                  align: 'center',
                },
                {
                  title: '组织名称',
                  key: 'name',
                  align: 'center',
                  tooltip:true,
                },
                {
                  title: '组织类型',
                  key: 'type',
                  align: 'center',
                },
                {
                  title: '地点',
                  key: 'location',
                  align: 'center',
                  tooltip:true,
                },
                {
                  title: '法人',
                  key: 'legalPerson',
                  align: 'center',
                  render: (h, params) => {
                    return h('div',params.row.legalPerson + params.row.phone)
                  }
                },
                {
                  title: '管理员',
                  key: 'adminName',
                  align: 'center',
                },
                {
                  title: '人员数',
                  key: 'peopleCount',
                  align: 'center',
                  tooltip:true,
                  sortable: true,
                  width: 80,
                  render: (h, params) => {
                    return h('div', [
                      h('div',{
                        class:'numberColor',
                      },params.row.peopleCount)
                    ]);
                  },
                },
                {
                  title: '状态',
                  align: 'center',
                  // render: (h, params) => {
                  //   return h('div',this.$Filters.statusType(params.row.status))
                  // }
                  render: (h, params) => {
                    const str = this.$Filters.statusType(params.row.status)
                    const color = str == '注销' ? 'error' : 'success';
                    const text = str == '注销' ? '注销' : '有效';
                    return h('Tag', {
                      props: {
                        type: 'dot',
                        color: color
                      },
                    }, text);
                  }
                },
                {
                  title: '操作',
                  key: 'action',
                  align: 'center',
                  render: (h, params) => {
                    return h('a', [
                      h('img', {
                        style: {
                          height: '20px',
                          width: '20px',
                        },
                        attrs: {
                          src: require('../../../assets/images/编辑.png')
                        },
                        on: {
                          click: e => {
                            e.stopPropagation();
                            this.edit(params.row)
                          }
                        }
                      }),
                      h('Divider', {props: {type: 'vertical'}}),
                      h('img', {
                        style: {
                          height: '20px',
                          width: '20px',
                        },
                        attrs: {
                          src: require('../../../assets/images/删除.png')
                        },
                        on: {
                          click: e => {
                            e.stopPropagation();
                            this.delete(params.row.id)
                          }
                        }
                      },),
                    ])
                  }
                },
              ],


              managementModal:false,
              managementTitle:'',
              managementLoading:true,
              managementUser:{},
              managementItem:{
                typeItem:[
                  {
                    value:'总部',
                    label:'总部',
                  },
                  {
                    value:'分公司',
                    label:'分公司',
                  },
                ],
                adminNameItem:[],
                statusItem:[
                  {
                    value:0,
                    label:'有效',
                  },
                  {
                    value:1,
                    label:'注销',
                  },
                ],
              },
              pictureItem:[],


              user:this.$store.getters.submitData,
            }
        },
        computed: {},
        watch: {},
        methods: {
          doSearch(){
            this.getIndex(1);
          },

          getIndex(page,query){
            let data = {
              pageNum:page
            }
            if (this.search.state) {
              data.status = this.search.state;
            }
            if (this.search.organizationId) {
              data.organizaitonId = this.search.organizationId;
            }
            if (this.search.query) {
              data.searchContent = this.search.query;
            }
            organizationsGetByPage(data).then(res => {
              this.tableList = res;
            }).catch(err => {
              this.$Message.error(err);
            })
          },
          changePage(page){
            this.page.current = page;
            this.getIndex(page)
          },
          onRowClick(item){
          },
          onSelectionChange(item){
          },
          managementOk(content){
            this.$refs.organizationManagementForm.$refs[content].validate((valid) => {
              if (valid) {
                if(this.pictureItem.length > 0){
                  this.postImage();
                }else{
                  this.postDepartments(this.managementUser);
                }
              } else {
                setTimeout(() => {
                  this.managementLoading = false;
                  this.$nextTick(() => {
                    this.managementLoading = true;
                  });
                }, 2000);
              }
            })
          },
          boforeUploadImageOne(file){
            if(file != undefined){
              let imageData=new FormData();
              imageData.append("images",file);
              imageData.append("userId",'1');
              imageData.append("tokenId",'1');
              return this.$postUrl('img/media/upload/image',{},imageData)
            }
          },
          postImage(){
            this.$axios.all([this.boforeUploadImageOne(this.pictureItem[0])])
              .then(this.$axios.spread((imageOne) => {
                let largeArr = []
                let smallArr = []
                if(imageOne.result != undefined){
                  largeArr.push(imageOne.result[0].large);
                  smallArr.push(imageOne.result[0].small);
                }
                this.add(largeArr,smallArr)
              }));
          },
          add (largeArr,smallArr) {
            let that = this;
            let largeImageUrl = [];
            let smallImageUrl = [];

            for (let i = 0; i < largeArr.length; i++) {
              largeImageUrl.push(largeArr[i].id);
            }
            for (let u = 0; u < smallArr.length; u++) {
              smallImageUrl.push(smallArr[u].id);
            }
            if(largeArr.length != 0){
              this.managementUser.picUrl = largeArr[0].url;
            }
            this.postDepartments(this.managementUser);
          },
          postDepartments(item){
            if(this.pictureItem.length == 0){
              item.picUrl = null;
            }
            if(item.id){
              organizationsUpdate(item)
                .then(res => {
                  this.managementModal = false;
                  this.getIndex(1);
                })
                .catch(err => {
                  this.$Message.error(err);
                })
            }else{
              organizationInsert(item)
                .then(res => {
                  this.managementModal = false;
                  this.getIndex(1);
                })
                .catch(err => {
                  this.$Message.error(err);
                })
            }
            this.managementModal = false;
          },
          managementCancel(content){
            this.managementModal = false;
          },
          addDepartments(){
            this.pictureItem = [];
            this.managementUser = {}
            this.managementUser.status = 0
            this.managementTitle = '新建 / 组织机构'
            this.managementModal = true;
          },
          edit(item){
            this.pictureItem = [];
            this.managementUser = {
              id:item.id,
              code: item.code,
              socialCode: item.socialCode,
              name: item.name,
              type: item.type,
              location: item.location,
              form: item.form,
              legalPerson: item.legalPerson,
              phone: item.phone,
              idNum: item.idNum,
              adminId: item.adminId,
              adminName: item.adminName,
              officePhone: item.officePhone,
              remarks: item.remarks,
              picUrl: item.picUrl,
              status: item.status,
            }
            if(item.picUrl != undefined && item.picUrl != null){
              this.pictureItem.push({
                url:item.picUrl
              })
            }
            this.managementTitle = '编辑 / 组织机构'
            this.managementModal = true;
          },
          delete(id){
            let self = this;
            this.$Modal.confirm({
              title: '删除',
              content: '是否确认删除？删除后，该信息将不再可见，请谨慎操作！',
              width: '400px',
              okText: '确定',
              cancelText: '关闭',
              onOk: function () {
                organizationsDelete({
                  userId: self.user.user.id,
                  id:id
                }).then(res => {
                  self.getIndex(1);
                }).catch(err => {
                  this.$Message.error(err);
                })
              }
            })
          },
          getUser(page){
            return  getByPage({
              pageNum:page,
            })
          },
          getFirst(page){
            return organizationsGetByPage({
              pageNum:page,
            })
          },

          getOrgList() {
            return getAllOrganizations({})
          },
          changeOrg(value){
            this.search.organizaitonId=value;

            this.this.getIndex(1);
          },
          apiAll(){
            this.$axios.all([this.getUser(1),this.getOrgList(),this.getFirst(1)])
              .then(this.$axios.spread((one,two, three) => {
                this.managementItem.adminNameItem = one.list;
                this.orgList = two;
                this.tableList = three;
              }));
          },
          onChangeAdminName(item){
            if(item != undefined){
              this.managementUser.adminId  = item.value
              this.managementUser.adminName  = item.label
            }
          },
          setImageListPicture(item){
            if(item.uploadListItems != undefined){
              this.pictureItem = item.uploadListItems
            }else{
              this.pictureItem.push(item)
            }

          },
          delImageListPicture(item){
            if(item.uploadListItems != undefined){
              this.pictureItem = item.uploadListItems
            }else{
              this.pictureItem.push(item)
            }
          },
          removeImageList(file){
            const fileList = this.pictureItem
            this.pictureItem.splice(fileList.indexOf(file), 1);
          },
        },
        created() {
          this.search.organizationId=this.user.user.userInfo.company;
        },
        mounted() {
          this.apiAll();
        },
    }
</script>

<style scoped lang="less">
    @deep: ~'>>>';
    @{deep}.ivu-card-body {
        padding: 10px !important;
    }
    .left{
      >div{
        display: flex;
        >div{
          margin:5px;
        }
        >div:nth-of-type(1){
          margin: 5px 0;
        }
      }
    }
    @{deep}.ivu-modal-footer{
      text-align: center!important;
    }
</style>
