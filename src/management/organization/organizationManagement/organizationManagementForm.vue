<template>
    <div class="v-clock">
      <Form class="addAccountUser" ref="managementUser" :model="managementUser" :label-width="130" :rules="ruleInline">
        <div>
          <FormItem label="组织编码:" prop="code">
            <Input type="text" v-model="managementUser.code" placeholder="请输入组织编码">
            </Input>
          </FormItem>
          <FormItem label="统一社会信用码:" prop="socialCode">
            <Input type="text"  v-model="managementUser.socialCode" placeholder="请输入统一社会信用码">
            </Input>
          </FormItem>
        </div>
        <div>
          <FormItem label="企业全称:" prop="name">
            <Input type="text" v-model="managementUser.name" placeholder="请输入企业全称">
            </Input>
          </FormItem>
          <FormItem label="组织类型:" prop="type">
            <Select v-model="managementUser.type" placeholder="请选择组织类型">
              <Option v-for="(item,index) in managementItem.typeItem"
                      :value="item.value"
                      :label="item.label"
                      :key="index">
              </Option>
            </Select>
          </FormItem>
        </div>
        <div>
          <FormItem label="企业地址:" prop="location">
            <Input type="text" v-model="managementUser.location" placeholder="请输入企业地址">
            </Input>
          </FormItem>
          <FormItem label="公司性质:" prop="form">
            <Input type="text" v-model="managementUser.form" placeholder="请输入公司性质">
            </Input>
          </FormItem>
        </div>
        <div>
          <div style="display:flex;">
            <FormItem label="法人姓名:">
              <Input type="text" v-model="managementUser.legalPerson" placeholder="请输入法人姓名">
              </Input>
            </FormItem>
            <FormItem label="法人电话:" class="box" prop="phone">
              <Input type="text" v-model="managementUser.phone" placeholder="请输入法人电话">
              </Input>
            </FormItem>
          </div>
          <FormItem label="法人证件号:" prop="idNum">
            <Input type="text" v-model="managementUser.idNum" placeholder="请输入法人证件号">
            </Input>
          </FormItem>
        </div>
        <!--<div>
          <div style="display:flex;">
            <FormItem label="管理员姓名:">
              <Input type="text" v-model="managementUser.adminName" placeholder="请输入管理员姓名">
              </Input>
            </FormItem>
            <FormItem label="管理员电话:" class="box" prop="adminId">
              <Input type="text" v-model="managementUser.adminId" placeholder="请输入管理员电话">
              </Input>
            </FormItem>
          </div>

        </div>-->
<!--        <div>-->
<!--          <FormItem label="管理员:" prop="adminId">-->
<!--            <Select filterable v-model="managementUser.adminId" :label-in-value="true" placeholder="请选择管理员" @on-change="onChangeAdminName">-->
<!--              <Option v-for="(item,index) in managementItem.adminNameItem"-->
<!--                      :label="item.name"-->
<!--                      :value="item.id"-->
<!--                      :key="index">-->
<!--                <span>{{item.name}}</span>-->
<!--                <span style="float:right;color:#ccc">{{item.phone}}</span>-->
<!--              </Option>-->
<!--            </Select>-->
<!--          </FormItem>-->

<!--        </div>-->
        <div>
          <FormItem label="办公电话:" prop="officePhone">
            <Input type="text" v-model="managementUser.officePhone" placeholder="请输入办公电话">
            </Input>
          </FormItem>
          <FormItem label="组织状态:">
            <Select v-model="managementUser.status">
              <Option v-for="(item,index) in managementItem.statusItem"
                      :value="item.value"
                      :label="item.label"
                      :key="index">
              </Option>
            </Select>
          </FormItem>

        </div>
        <div>
          <FormItem label="营业执照:" class="imgBox">
            <UploadImage
              ref="UploadImage"
              :type="3"
              @setImageList="setImageListPicture"
              :uploadList="pictureItem"
              @delImageList="delImageListPicture"
              @removeImageList="removeImageList"
              :imageTitle="'上传'"
              :imageNum="1">
            </UploadImage>
          </FormItem>
        </div>
        <div style="display:flex;">

        </div>

        <div>
          <FormItem label="备注说明:">
            <Input
              v-model="managementUser.remarks"
              type="textarea"
              :autosize="{minRows: 5,maxRows: 5}"
              placeholder="请输入备注说明" />
          </FormItem>
        </div>
      </Form>
    </div>
</template>

<script>
  import UploadImage from '@/commonComponent/UploadTemplate'
    export default {
        name: "organizationManagementForm",
        components: {
          UploadImage,
        },
        props: ['managementUser','managementItem','pictureItem'],
        data() {
            return {
              ruleInline: {
                code: [
                  { required: true, message: '请输入组织编码', trigger: 'blur' }
                ],
                socialCode:[
                  {required: true, message: '请输入统一社会信用码', trigger: 'blur'},
                  {
                    type: 'string',
                    pattern: /^[A-Za-z0-9]+$/,
                    message: '统一社会信用码为数字与字母组合!',
                    trigger: 'blur'
                  }
                ],
                phone: [
                  {
                    required: false,
                    type: "string",
                    message: "",
                    trigger: "blur"
                  },
                  {
                    type: "string",
                    pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                    message: "请输入正确法人手机号!",
                    trigger: "blur"
                  }
                ],
                adminId: [
                  {
                    required: false,
                    type: "string",
                    message: "",
                    trigger: "blur"
                  },
                  {
                    type: "string",
                    pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                    message: "请输入正确管理员手机号!",
                    trigger: "blur"
                  }
                ],
                idNum: [
                  {
                    required: false,
                    type: "string",
                    message: "",
                    trigger: "blur"
                  },
                  {
                    type: "string",
                    pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                    message: "请输入正确证件号码!",
                    trigger: "blur"
                  }
                ],
                name: [
                  { required: true, message: '请输入企业全称', trigger: 'blur' }
                ],
                type: [
                  { required: true, message: '请选择组织类型', trigger: 'change' }
                ],
                // adminId: [
                //   { required: true, message: '请选择管理员', trigger: 'change' }
                // ],
                officePhone: [
                  { required: true, message: '请输入办公电话', trigger: 'blur' }
                ],
                form: [
                  { required: true, message: '请输入公司性质', trigger: 'blur' }
                ],
                location: [
                  { required: true, message: '请输入企业地址', trigger: 'blur' }
                ],
              },
            }
        },
        computed: {},
        watch: {},
        methods: {
          onChangeAdminName(item){
            this.$emit('onChangeAdminName',item)
          },
          setImageListPicture(item){
            this.$emit('setImageListPicture',item)
          },
          delImageListPicture(item){
            this.$emit('delImageListPicture',item)
          },
          removeImageList(file){
            this.$emit('removeImageList',file)
          }
        },
        created() {

        },
        mounted() {

        },
    }
</script>

<style scoped lang="less">
    @deep: ~'>>>';
    @{deep}.ivu-card-body {
        padding: 10px !important;
    }
    .addAccountUser{
      >div{
        margin:15px 0;
        display: flex;
        justify-content: space-between;
        >div{
          width: 50%;
        }
      }
      >div:nth-of-type(7){
        display: block;
        >div:nth-of-type(1){
          width: 100%;
        }
      }
      >div:nth-of-type(8){
        display: block;
        >div:nth-of-type(1){
          width: 100%;
        }
      }
    }
    @{deep}.box{
      >.ivu-form-item-label{
        width: 90px!important;
      }
      >.ivu-form-item-content{
        margin-left: 90px!important;
      }
    }
    @{deep}.imgBox{
        >div{
          >div{
            display: flex;
            justify-content: space-between;
            .demo-upload-list{
              width: 80px;
              height: 80px;
            }
            .demo-upload-list-cover i{
              color: #fff;
              font-size: 20px;
              cursor: pointer;
              margin: 0 2px;
              line-height: 80px;
            }
          }
        }
    }
</style>
