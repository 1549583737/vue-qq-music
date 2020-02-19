<template>
  <div class="minipage-config">
    <div class="searchConditionWrapper">
      <el-form :inline="true" class="pageConfigForm">
        <el-form-item class="productLine controlWidth">
          <el-select
            v-model="miniFormData.productLine"
            size="small"
            placeholder="请选择产品线"
            clearable
          >
            <el-option
              v-for="(item, index) in productLineList"
              :key="index"
              :label="item.name"
              :value="item.name"
            >{{ item.name }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="pageUrlType controlWidth">
          <el-select
            v-model="miniFormData.pageUrlType"
            size="small"
            placeholder="请选择页面URL类型"
            clearable
          >
            <el-option label="静态" value="1"></el-option>
            <el-option label="动态" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="status controlWidth">
          <el-select
            v-model="miniFormData.status"
            size="small"
            placeholder="请选择状态"
            clearable
          >
            <el-option
              v-for="(item, index) in statusList"
              :key="index"
              :label="item.label"
              :value="item.value"
            >{{ item.label }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input v-model="miniFormData.keyword" clearable size="small"/>
        </el-form-item>

        <el-form-item>
          <el-button size="small" type="primary" @click="_search"
          >查询
          </el-button
          >
        </el-form-item>

        <el-form-item>
          <el-button
            size="small"
            @click="addmodel"
            :disabled="userPower != 2"
            type="primary"
          >新增
          </el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="tableListWrapper">
      <el-table
        size="small"
        :data="miniTableData"
        :height="tableHeight"
        v-loading="loading"
      >
        <el-table-column align="center" label="页面名称" width="150">
          <template slot-scope="scopes">
            <div :data-content="scopes.row.pageName" class="cellEllipsis">
              <span>&nbsp;{{ scopes.row.pageName }}&nbsp;</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="pageCode"
          align="center"
          label="页面编码"
          width="120"
        >
          <template slot-scope="scopes">
            <div :data-content="scopes.row.pageCode" class="cellEllipsis">
              <span>&nbsp;{{ scopes.row.pageCode }}&nbsp;</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="页面URL类型"
          :min-width="minColumnWidth('页面URL类型')"
        >
          <template slot-scope="scopes">
            {{ scopes.row.pageUrlType | pageUrlT }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="页面URL" width="130">
          <template slot-scope="scopes">
            <div :data-content="scopes.row.pageUrl" class="cellEllipsis">
              <span>&nbsp;{{ scopes.row.pageUrl }}&nbsp;</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="所属产品线"
          :min-width="minColumnWidth('所属产品线')"
        >
          <template slot-scope="scopes">
            <div
              :data-content="
                scopes.row.productLine ? scopes.row.productLine.name : ''
              "
              class="cellEllipsis"
            >
              <span
              >&nbsp;{{
                  scopes.row.productLine ? scopes.row.productLine.name : ""
                }}&nbsp;</span
              >
            </div>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="产品线负责人"
          :min-width="minColumnWidth('产品线负责人')"
        >
          <template slot-scope="scopes">
            <div
              :data-content="
                scopes.row.productLine
                  ? scopes.row.productLine.leadingPerson
                  : '' | formatProductLineName
              "
              class="cellEllipsis"
            >
              <span
              >&nbsp;{{
                  scopes.row.productLine
                    ? scopes.row.productLine.leadingPerson
                    : "" | formatProductLineName
                }}&nbsp;</span
              >
            </div>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="pagenameParams"
          label="pagename参数"
          :min-width="minColumnWidth('pagename参数')"
        >
          <template slot-scope="scopes">
            <el-popover width="500" :ref="`popover-${scopes.$index}`">
              <span class="popTitle">pagename参数</span>
              <el-table
                size="small"
                :data="pageConfigList"
                :header-cell-style="tableHeaderColor"
                max-height="250"
                border
              >
                <el-table-column label="参数key" align="center">
                  <template slot-scope="scope">
                    <el-popover
                      popper-class="pageConfigPopover"
                      placement="top"
                      trigger="hover"
                      :content="scope.row.pageConfigKey || '-'"
                    >
                      <div class="cellEllipsis" slot="reference">
                        {{ scope.row.pageConfigKey || "-" }}
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column label="参数值" align="center">
                  <template slot-scope="scope">
                    <el-popover
                      popper-class="pageConfigPopover"
                      placement="top"
                      trigger="hover"
                      :content="scope.row.pageConfigValue || '-'"
                    >
                      <div class="cellEllipsis" slot="reference">
                        {{ scope.row.pageConfigValue || "-" }}
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column
                  :min-width="minColumnWidth('参数是否必埋')"
                  label="参数是否必埋"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div class="cellEllipsis" slot="reference">
                      {{ scope.row.nullable | nullable }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  :min-width="minColumnWidth('参数值是否固定')"
                  label="参数值是否固定"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div class="cellEllipsis" slot="reference">
                      {{ scope.row.variable | variable }}
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="popFooter">
                <span>共{{ pageConfigList.length }}条</span>
                <el-button size="small" @click="cancelPopover(scopes)"
                >取消
                </el-button
                >
              </div>
              <img
                class="pagenameParams"
                slot="reference"
                src="../../../static/img/pageexcel.png"
                alt=""
                @click="_getPageConfigList(scopes.row.id)"
              />
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column align="center" label="更新人">
          <template slot-scope="scopes">
            <div
              :data-content="scopes.row.updateUser | formatName"
              class="cellEllipsis"
            >
              <span>&nbsp;{{ scopes.row.updateUser | formatName }}&nbsp;</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="负责人">
          <template slot-scope="scopes">
            <div
              :data-content="scopes.row.leadingPerson | formatName"
              class="cellEllipsis"
            >
              <span
              >&nbsp;{{ scopes.row.leadingPerson | formatName }}&nbsp;</span
              >
            </div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="更新时间" width="135">
          <template slot-scope="scopes">
            <div>
              <span>{{ scopes.row.updateTime }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="审核状态" width="100">
          <template slot-scope="scopes">
            <div :data-content="scopes.row.status" class="cellEllipsis">
              <span>&nbsp;{{ scopes.row.status }}&nbsp;</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column fixed="right" align="center" label="操作" width="260">
          <template slot-scope="scopes">
            <el-button
              type="primary"
              size="mini"
              :disabled="btnIsDisabledArr[scopes.$index].modifyDisabled"
              @click="editHandle(scopes.row, scopes.$index)"
            >
              修改
            </el-button>
            <el-button
              type="primary"
              size="mini"
              :disabled="btnIsDisabledArr[scopes.$index].auditDisabled"
              @click="auditHandle(scopes.row, scopes.$index)"
            >
              审核
            </el-button>
            <el-button
              type="primary"
              size="mini"
              class="delBtn"
              :disabled="btnIsDisabledArr[scopes.$index].delDisabled"
              @click="delHandle(scopes.row, scopes.$index)"
            >
              {{ delBtnTextChange(scopes.row.status) }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="miniPagination"
      layout="total, prev, pager, next, sizes"
      :page-sizes="[10, 20, 30, 40]"
      :current-page="pagination.currentPage"
      :total="pagination.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>

    <el-dialog
      :title="dialogName == 'add' ? '页面信息配置新增' : '页面信息配置修改'"
      :visible.sync="addmodelVisible"
      class="page-config-dialog"
      @close="addClose('modelForm')"
    >
      <el-form
        size="mini"
        ref="modelForm"
        :model="modelForm"
        label-width="100px"
      >
        <el-form-item
          label="页面编码"
          class="page-config-dial"
          prop="pageCode"
          :rules="rules.pageCode"
        >
          <!-- <el-autocomplete
            class="inline-input"
            v-model="modelForm.pageCode"
            :fetch-suggestions="pageCodeSearch"
            placeholder="请输入页面编码查询"
            @select="pageCodeSelect"
          ></el-autocomplete> -->
          <el-select :disabled="dialogName=='edit'" style="text-align:center" size="mini" @focus='pageCodeFocus'
                     filterable
                     :remote-method='pageCodeSea' remote placeholder='请输入页面编码查询' @change='pageCodeChange' clearable
                     v-model="modelForm.pageCode">
            <el-option
              v-for="(item, index) in restaurants"
              :key="index"
              :label="item.pageCode"
              :value="item.pageCode"
            >{{ item.pageCode }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="页面名称" class="page-config-diar" prop="pageName">
          <el-input v-model="modelForm.pageName" disabled></el-input>
        </el-form-item>
        <el-form-item
          label="所属产品线"
          prop="productLineName"
          class="page-config-dial"
        >
          <el-select
            v-model="modelForm.productLineName"
            placeholder="请选择所属产品线"
            clearable
          >
            <el-option
              v-for="(item, index) in productLineList"
              :key="index"
              :label="item.name"
              :value="item.name"
            >{{ item.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="页面URL类型"
          class="page-config-dial"
          prop="pageUrlType"
          :rules="rules.pageUrlType"
        >
          <el-select
            v-model="modelForm.pageUrlType"
            @change="changepgUrlType"
            placeholder="请选择页面URL类型"
            clearable
          >
            <el-option label="动态" :value="0"></el-option>
            <el-option label="静态" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="页面URL"
          class="page-config-diar"
          prop="pageUrl"
          :rules="rules.pageUrl"
        >
          <el-input
            placeholder="请输入页面URL"
            v-model="modelForm.pageUrl"
            clearable
          >
            <template slot="prepend">http(s)://</template>
          </el-input>
        </el-form-item>
        <el-form-item label="更新人" prop="updateUser" class="page-config-diar">
          <el-input disabled v-model="modelForm.updateUser"></el-input>
        </el-form-item>
        <el-form-item
          label="负责人"
          class="page-config-dial"
          prop="leadingPerson"
        >
          <el-input v-model="modelForm.leadingPerson" disabled></el-input>
        </el-form-item>
        <el-form-item class="page-config-key">
          <el-row>
            <el-col :span="4" class="page-config-keytitle">pagename参数</el-col>
            <el-col :span="3" :offset="14">
              <el-button
                type="primary"
                class="common-buttonpagemini"
                @click="addLine"
              >新增参数
              </el-button
              >
            </el-col>
            <el-col :span="3">
              <el-button
                type="primary"
                class="common-buttonpagemini"
                @click="batchDel"
              >删除
              </el-button
              >
            </el-col>
          </el-row>
          <el-row style="padding-right:1.5%;margin-top:5px">
            <el-table size='mini' :border=true @selection-change="handleSelectionChange"
                      :data="modelForm.pageParaInfoList" max-height="200px"
                      :header-cell-class-name='must'>
              <el-table-column :resizable="false" type="selection" style="width:5%" align="right">
              </el-table-column>
              <el-table-column
                :resizable="false"
                label="参数key"
                class="is-required"
                align="center"
                min-width="110"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'pageParaInfoList.' + scope.$index + '.pageConfigKey'"
                                :rules='rules.pageConfigKey'>
                    <el-select style="text-align:center" size="mini" filterable clearable placeholder='请选择参数key'
                               v-model="scope.row.pageConfigKey" @focus="getParmeKey">
                      <el-option
                        v-for="(item, index) in parmeKey"
                        :key="index"
                        :label="item.pageConfigKey"
                        :value="item.pageConfigKey"
                      >{{ item.pageConfigKey }}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                :resizable="false"
                label="参数值"
                class="is-required"
                align="center"
                min-width="110"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'pageParaInfoList.' + scope.$index + '.pageConfigValue'"
                                :rules='rules.pageConfigValue'>
                    <el-input clearable v-model="scope.row.pageConfigValue" maxlength="255"
                              placeholder='请输入参数值'></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                :resizable="false"
                label="参数key是否必埋"
                class="is-required"
                align="center"
                min-width="110"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'pageParaInfoList.' + scope.$index + '.nullable'" :rules='rules.nullable'>
                    <el-select clearable style="text-align:center" size="mini" placeholder='请选择'
                               v-model="scope.row.nullable">
                      <el-option label="是" :value="0"></el-option>
                      <el-option label="否" :value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                :resizable="false"
                label="参数值是否固定"
                class="is-required"
                align="center"
                min-width="110"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'pageParaInfoList.' + scope.$index + '.variable'" :rules='rules.variable'>
                    <el-select clearable style="text-align:center" size="mini" placeholder='请选择'
                               v-model="scope.row.variable">
                      <el-option label="是" :value="0"></el-option>
                      <el-option label="否" :value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="addSave('modelForm')"
          size="mini"
          class="clickSave"
        >保 存
        </el-button
        >
        <el-button
          type="info"
          @click="addClose('modelForm')"
          size="mini"
          class="clickRemove"
          plain
        >取 消
        </el-button
        >
      </div>
    </el-dialog>
    <el-button
      class="clickDisplay"
      ref="cancelP"
      style="display: none"
    ></el-button>
  </div>
</template>

<script>
  import {getEnv, newmessageBox, saPageViewInit, selfDefineTooltips} from '../../utils'
  import {
    deletePageParaConfig,
    getBaseInfo,
    getPageCodes,
    getPageConfigKeys,
    getPageConfigList,
    getProductLineList,
    pageConfigadd,
    pageConfigedit,
    pageParaConfigCheck
  } from '../../api'

  export default {
    name: 'miniPageConfig',
    filters: {
      pageUrlT: function (value) {
        if (value + '' === '0') {
          return '动态'
        } else if (value + '' === '1') {
          return '静态'
        }
      },
      nullable: function (value) {
        if (value + '' === '0') {
          return '是'
        } else if (value + '' === '1') {
          return '否'
        } else {
          return '-'
        }
      },
      variable: function (value) {
        if (value + '' === '0') {
          return '是'
        } else if (value + '' === '1') {
          return '否'
        } else {
          return '-'
        }
      },
      // 产品线负责人过滤工号只保留姓名
      formatProductLineName: function (value) {
        const personNameList = []
        const idx = value ? value.indexOf('(') : 0
        value
        && value.split(',').map(item => {
          personNameList.push(item.slice(0, idx))
        })
        return personNameList.join('、')
      },
      // 更新人负责人过滤工号只保留姓名
      formatName: function (value) {
        /**
         * 更新人，负责人格式化后台返回数据19082938:张三 过滤后返回张三，如果有多个用‘、'分隔
         * @param  {[type]} cellValue [description] 单元格值
         * @return {[type]} [description]
         */
        const leadingPerson = []
        value
        && value.split(',').map(item => {
          leadingPerson.push(item.split(':')[1])
        })
        return leadingPerson.join('、')
      }
    },
    data() {
      const pageConfigKeyrule = (rule, value, callback) => {
        var arr = []
        var arr1 = []
        this.modelForm.pageParaInfoList.map((item, index) => {
          arr.push(item)
        })
        arr.map((item, index) => {
          if (item.pageConfigKey == value) {
            arr1.push(item.pageConfigKey)
          }
        })
        if (arr1.length > 1 && value != '') {
          callback(new Error('该参数key已重复'))
        } else if (!value) {
          callback(new Error('请选择参数key'))
        } else {
          callback()
        }
      }
      const pageurlrule = (rule, value, callback) => {
        var val = value == undefined ? '' : value
        var reg = /^https?:\/\//
        var reg1 = /^https:\/\//
        var reg2 = /^http:\/\//
        if (reg.test(val)) {
          if (reg1.test(val)) {
            val = val.replace('https://', '')
            if (val.indexOf('?') > -1 && this.modelForm.pageUrlType == '1') {
              // 静态
              val = val.split('?')[0]
            }
          }
          if (reg2.test(val)) {
            val = val.replace('http://', '')
            if (val.indexOf('?') > -1 && this.modelForm.pageUrlType == '1') {
              // 静态
              val = val.split('?')[0]
            }
          }
        } else if (this.modelForm.pageUrlType == '1') {
          if (val.indexOf('?') > -1) {
            val = val.split('?')[0]
          }
        }

      }
      return {
        miniData: {}, // 存储从页面管理带过来的信息
        dialogName: 'add', // 点击的是新增还是修改或者审核删除
        userPower: 0,   // 用户权限
        isSuper: false, // 是否是超级管理员
        showDoInfo: [],
        btnIsDisabledArr: [], // 审核，修改，删除按钮是否置灰
        tipClass: null,
        miniTableData: [],
        tableHeight: 480,
        loading: false,
        miniFormData: {
          productLine: [],
          pageUrlType: null,
          status: null,
          keyword: ''
        },
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        pageConfigList: [],
        productLineList: [],
        statusList: [
          {
            label: '已生效',
            value: '0'
          },
          {
            label: '新增待审核',
            value: '1'
          },
          {
            label: '修改待审核',
            value: '2'
          },
          {
            label: '删除待审核',
            value: '3'
          }
          // {
          //   label: '已删除',
          //   value: '4'
          // }
        ],
        name: '', // 当前登录姓名
        jobNumber: '', // 当前登录工号
        loginName: '', // 当前登录人
        choiseLise: '', // 用于保存选中的数据
        // productLine: [
        //   { name: '首页', leadingPerson: '徐杰(17070672)' },
        //   { name: '频道', leadingPerson: '陈超(16110509)' }], // 所属产品线
        parmeKey: [], // [ {'pageConfigKey': 'atpgb1bu4kt7vx','status': '2','isshow': '0','businessDomain': '电商'}]
        // 用于保存参数key的众多选择项
        addmodelVisible: false,
        need: '请输入',
        modelForm: {
          pageCode: '',
          pageUrlType: '',
          productLineName: '', // 所属产品线
          pageUrl: '',
          updateUser: '',
          leadingPerson: '',
          pageParaInfoList: []
        },
        rules: {
          pageCode: {
            type: 'string', required: true, message: '请输入页面编码', trigger: 'change'
          },
          pageUrl: {
            type: 'string', required: true, validator: pageurlrule, trigger: 'blur'
          },
          pageUrlType: {
            type: 'number', required: true, message: '请选择页面URL类型', trigger: 'change'
          },
          pageConfigValue: {
            type: 'string', required: true, message: '请输入参数值', trigger: 'change'
          },
          pageConfigKey: {
            type: 'string', required: true, validator: pageConfigKeyrule, trigger: 'change'
          },
          nullable: {
            type: 'number', required: true, message: '请选择', trigger: 'change'
          },
          variable: {
            type: 'number', required: true, message: '请选择', trigger: 'change'
          }
        },
        restaurants: []

      }
    },

    methods: {
      changepgUrlType(val) {
        this.modelForm.pageUrl = ''
        // this.$refs.modelForm.validateField('pageUrl')// 手动触发页面url选项校验
      },
      minColumnWidth(str) {
        return str.length * 16
      },
      cancelPopover(scopes) {
        scopes._self.$refs[`popover-${scopes.$index}`].doClose()
        // console.log(scopes._self.$refs[`popover-${scopes.$index}`])
        this.$refs.cancelP.$el.click()
        this.pageConfigList = []
        // const trigger = () => {
        //   const $el = this.$refs.cancelP.$el;
        //   $el.dispatchEvent(new Event('click'));
        // }
        // if (!this.$refs.cancelP.$el) {
        //   this.$nextTick(trigger.bind(this))
        // } else {
        //   trigger();
        // }
      },
      tableHeaderColor({row, rowIndex}) {
        return 'background-color:#61C99E!important;color:#ffffff'
      },
      // 审核操作处理
      auditHandle(row, idx) {
        const params = {
          id: row.id
        }
        pageParaConfigCheck(
          params,
          res => {
            if (res.code == '0000') {
              this.$message({
                message: '审核通过',
                type: 'success'
              })
              if (row.status == '删除待审核') {
                // 当前是第一页，并且不止一页数据
                // 当前不是第一页，如果满足只有一条数据的情况，删除成功后，页码仍置为1，如果当前不止一页数据且当前页码大于1，删除成功后，取页码总数和页长的商
                if (
                  this.pagination.currentPage == 1
                  && this.pagination.total > this.pagination.pageSize
                ) {
                  this.pagination.currentPage = 1
                } else {
                  this.pagination.currentPage
                    = (this.pagination.total - 1) % this.pagination.pageSize == 0
                    ? (this.pagination.total - 1) / this.pagination.pageSize
                    == 0
                      ? 1
                      : (this.pagination.total - 1) / this.pagination.pageSize
                    : this.pagination.currentPage
                }
              }
              this._getBaseInfo()
            }
          },
          err => {
            console.log(err)
          }
        )
      },

      /**
       * methed:editHandle
       * @msg: 修改按钮点击处理
       */
      editHandle(row, idx) {
        this.dialogName = 'edit' // 标记为修改状态
        this.modelForm = Object.assign({}, row) // 行数据赋值给表格数据
        this.modelForm.updateUser = this.loginName // 更新人变为当前登录人
        this.addmodelVisible = true // 显示弹窗
        this._getPageConfigList(this.modelForm.id) // 获取pagename参数列表
        this.modelForm.status = this.numEscape(this.modelForm.status)
      },

      // 删除操作处理
      delHandle(row, idx) {
        const msg = this.delBtnTextChange(row.status)
        const params = {
          id: row.id,
          status: this.numEscape(row.status)
        }
        deletePageParaConfig(
          params,
          res => {
            if (res.code == '0000') {
              this.$message({
                message: `${msg}成功`,
                type: 'success'
              })
              this._getBaseInfo()
            }
          },
          err => {
            console.log(err)
          }
        )
      },
      // 删除按钮根据当前状态发生改变
      delBtnTextChange(t) {
        if (t === '新增待审核') {
          return '撤销新增'
        }
        if (t === '修改待审核') {
          return '撤销修改'
        }
        if (t === '删除待审核') {
          return '撤销删除'
        }
        if (t === '已生效') {
          return '删除'
        }
      },
      // 将中文转移成数字
      numEscape(status) {
        if (status == '已生效') {
          return '0'
        } else if (status == '新增待审核') {
          return '1'
        } else if (status == '修改待审核') {
          return '2'
        } else if (status == '删除待审核') {
          return '3'
        }
        // else if (status == '已删除') {
        //   return '4'
        // }
      },
      // 获取当前用户操作权限
      getAuthorityInfo() {
        this.isSuper = this.$store.getters.getUserInfo.isSuper
        this.showDoInfo = this.$store.getters.getshowDoInfo
        if (this.showDoInfo.some(item => item.moduleId == 14)) {
          this.showDoInfo = this.showDoInfo.filter(item => item.moduleId == 14)
          if (this.showDoInfo[0].roleId === 1) {
            this.userPower = 1 // 查看权限
          } else if (this.showDoInfo[0].roleId === 2) {
            this.userPower = 2 // 操作权限
          }
        } else {
          this.userPower = 0 // 无权限
        }
      },
      // 点击查询按钮
      _search() {
        this.pagination.currentPage = 1
        this._getBaseInfo()
      },
      // 查询页面参数配置基础信息
      _getBaseInfo() {
        this.loading = true
        const params = {
          terminalType: '2',
          siteCode: this.miniData.code,
          productLine: this.miniFormData.productLine,
          pageUrlType: this.miniFormData.pageUrlType,
          status: this.miniFormData.status,
          keyword: this.miniFormData.keyword,
          currentPage: this.pagination.currentPage,
          pageSize: this.pagination.pageSize
        }
        getBaseInfo(
          params,
          res => {
            if (res.code === '0000') {
              if (
                this.pagination.currentPage != 1
                && res.data.list
                && res.data.list.length == 0
              ) {
                this._search()
                return
              }
              const list = res.data.list.slice() || []
              if (list && list.length > 0) {
                list.map(item => {
                  switch (item.status + '') {
                    case '0':
                      item.status = '已生效'
                      break
                    case '1':
                      item.status = '新增待审核'
                      break
                    case '2':
                      item.status = '修改待审核'
                      break
                    case '3':
                      item.status = '删除待审核'
                      break
                    // case '4':
                    //   item.status = '已删除'
                    //   break
                  }
                  return item
                })
              }
              this.miniTableData = list
              this.pagination.total = res.data ? res.data.total : 0
              this.handleBtnAuthoriry()
              this.loading = false
            }
          },
          err => {
            console.log(err)
          }
        )
      },
      // 设置审核、修改、操作按钮是否置灰
      handleBtnAuthoriry() {
        this.btnIsDisabledArr = []
        if (this.miniTableData) {
          // 不具有操作权限，且不是超级管理员，按钮全部不可操作，并置灰
          if (this.userPower != 2 && !this.isSuper) {
            for (let i = 0; i < this.miniTableData.length; i++) {
              this.btnIsDisabledArr.push({
                auditDisabled: true,
                modifyDisabled: true,
                delDisabled: true
              })
            }
          } else {
            // 根据接口中返回的状态判断按钮是否可操作
            for (let i = 0; i < this.miniTableData.length; i++) {
              // 待审核的状态，修改按钮不可操作，超管、产品线负责人、数据负责人可进行修改操作
              const productLineDis
                = this.miniTableData[i].productLine.leadingPerson
                && this.miniTableData[i].productLine.leadingPerson.indexOf(
                  this.loginName
                ) > -1
              const leadingPersonDis
                = this.miniTableData[i].leadingPerson
                && this.miniTableData[i].leadingPerson.indexOf(this.loginName) > -1

              const modifyDisabled
                = this.miniTableData[i].status.indexOf('删除待审核') == -1
                && (productLineDis || leadingPersonDis || this.isSuper)

              // 已生效的状态，审核按钮不可操作，只有超管和产品线负责人可进行审核操作
              const auditDisabled
                = this.miniTableData[i].status.indexOf('已生效') == -1
                && (productLineDis || this.isSuper)

              // 删除或撤销操作，只有超管、产品线负责人、数据负责人可进行操作
              const delDisabled
                = productLineDis || leadingPersonDis || this.isSuper
              this.btnIsDisabledArr.push({
                modifyDisabled: !modifyDisabled, // 修改
                auditDisabled: !auditDisabled, // 审核
                delDisabled: !delDisabled // 删除
              })
            }
          }
        }
      },
      // 点击页码
      handleCurrentChange(val) {
        this.pagination.currentPage = val
        this._getBaseInfo()
      },
      handleSizeChange(val) {
        this.pagination.currentPage = 1
        this.pagination.pageSize = val
        this._getBaseInfo()
      },
      /**
       * method: getProductLineList
       * @msg: 获取产品新名称和产品线负责人数据
       * @param all <Boolean> true/false：是否查询全部，不传或者传true是查询所有，false是查询已配置的
       */
      _getProductLineList(all) {
        const params = all === 'false' ? {all: false} : {}
        getProductLineList(
          params,
          res => {
            if (res.code === '0000') {
              if (res.data && res.data.length > 0) {
                this.productLineList = res.data || []
              }
            }
          },
          err => {
            console.log(err)
          }
        )
      },
      /**
       * methed:_getPageConfigList
       * @msg:  获取pagename参数
       */
      _getPageConfigList(baseInfoId) {
        const params = {baseInfoId: baseInfoId}
        getPageConfigList(
          params,
          res => {
            if (res.code === '0000') {
              if (res.data && res.data.length > 0) {
                this.pageConfigList = res.data
                this.modelForm.pageParaInfoList = res.data // 修改时弹窗中的pagename参数列表数据
              } else {
                this.pageConfigList = []
              }
            }
          },
          err => {
            console.log(err)
          }
        )
      },
      /**
       * methed:pageCodeFocus   pageCodeSea
       * @msg:  弹窗中的页面名称查询（带模糊查询的）
       */
      pageCodeFocus() {
        const params = {
          siteCode: this.miniData.code,
          search: '',
          terminalType: 'mp'
        }
        getPageCodes(params, res => {
          if (res.code == '0000') {
            this.restaurants = res.data
          }
        })
      },

      /**
       * methed:getParmeKey
       * @msg:  弹窗中的pagename 参数key获取
       */
      getParmeKey() {
        const params = {
          siteCode: this.miniData.code,
          search: '',
          terminalType: 'mp'
        }
        getPageConfigKeys(params, res => {
          if (res.code == '0000') {
            this.parmeKey = res.data
          }
        })
      },

      pageCodeSea(val) {
        const params = {
          siteCode: this.miniData.code,
          search: val || '',
          terminalType: 'mp'
        }
        getPageCodes(params, res => {
          if (res.code == '0000') {
            this.restaurants = res.data
          }
        })
      },

      pageCodeChange(val) {
        this.restaurants.map((item, index) => {
          if (item.pageCode == val) {
            this.modelForm.pageName = item.pageName
            this.modelForm.leadingPerson = item.leadingPerson
            if (
              !this.isSuper
              && item.leadingPerson.indexOf(this.loginName) == -1
            ) {
              this.$message({
                message: '您不是该页面负责人，无法新增配置！',
                type: 'warning'
              })
              this.modelForm.pageCode = ''
              this.modelForm.pageName = ''
              this.modelForm.leadingPerson = ''
            }
          }
        })
      },
      addmodel() {
        this.addmodelVisible = true
        this.dialogName = 'add'
      },
      /**
       * methed:addLine
       * @msg: 新增行 无数据时可新增 每次只能新增一行
       */
      addLine() {
        if (this.modelForm.pageParaInfoList.length < 30) {
          var newValue = {
            pageConfigKey: '',
            pageConfigValue: '',
            nullable: '',
            variable: ''
          }
          this.modelForm.pageParaInfoList.push(newValue) // 添加新的一行
        } else {
          // 添加失败，最多支持30行参数配置！
          this.$message({
            message: ' 添加失败，最多支持30行参数配置！',
            type: 'warning'
          })
        }
      },
      /**
       * methed:handleSelectionChange
       * @msg: 操作多选
       * parmas:val 当前枚举值列表数据
       */
      handleSelectionChange(val) {
        this.choiseLise = val
      },
      /**
       * methed:batchDel
       * @msg:  多选的删除
       */
      batchDel() {
        if (this.modelForm.pageParaInfoList.length == 0) {
          this.$message({
            message: '列表暂无数据可删除',
            type: 'error'
          })
        } else {
          if (this.choiseLise.length == 0) {
            this.$message({
              message: '请先选中需删除数据再进行此操作',
              type: 'warning'
            })
          } else {
            var aaa = []
            this.modelForm.pageParaInfoList.map((item, index) => {
              this.choiseLise.map((item1, index1) => {
                if (item == item1) {
                  aaa.push(index)
                }
              })
            })
            var reverselist = aaa
              .join(',')
              .split(',')
              .reverse()
            this.$confirm('您确认删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                for (var i = 0; i < reverselist.length; i++) {
                  this.modelForm.pageParaInfoList.splice(reverselist[i], 1)
                }
                this.confirm()
              })
              .catch(() => {
              })
          }
        }
      },
      must(obj) {
        if (
          obj.columnIndex == 1
          || obj.columnIndex == 2
          || obj.columnIndex == 3
          || obj.columnIndex == 4
        ) {
          return 'must'
        }
      },

      /**
       * methed:addSave
       * @msg: 弹窗的保存
       * parmas:val 当前枚举值列表数据
       * parmas:表格名称
       */
      addSave(form) {
        // 弹窗的保存
        this.$refs[form].validate(valid => {
          if (this.modelForm.pageParaInfoList.length == 0) {
            this.$message({
              message: '请填写pagename参数',
              type: 'warning'
            })
          } else {
            if (valid) {
              var obj = {
                siteCode: this.miniData.code,
                terminalType: 2,
                pageType: ''
              } // terminalType 0:网页端 1：移动端 2，小程序
              obj = Object.assign(obj, this.modelForm)
              if (this.dialogName == 'add') {
                // 点击新增
                pageConfigadd(obj, res => {
                  if (res.code == '0000') {
                    this.$message({
                      message: '新增成功',
                      type: 'success'
                    })
                    this.$refs[form].resetFields() // 清空数据
                    this.addmodelVisible = false // 关闭弹窗
                    this._getBaseInfo()
                  }
                })
              } else if (this.dialogName == 'edit') {
                var parmes = {
                  id: this.modelForm.id,
                  pageParaInfoList: this.modelForm.pageParaInfoList,
                  pageUrl: this.modelForm.pageUrl,
                  pageUrlType: this.modelForm.pageUrlType,
                  productLineName: this.modelForm.productLineName,
                  updateUser: this.loginName,
                  terminalType: 2
                }
                pageConfigedit(parmes, res => {
                  if (res.code == '0000') {
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    })
                    this.$refs[form].resetFields() // 清空数据
                    this.addmodelVisible = false // 关闭弹窗
                    this._getBaseInfo()
                  }
                })
              }
            }
          }
        })
      },

      /**
       * methed:addClose
       * @msg: 弹窗的取消
       */

      addClose(form) {
        this.addmodelVisible = false
        this.$nextTick(() => {
          this.$refs[form].resetFields() // 清空数据
        })
        this.modelForm.pageParaInfoList = [] // 置空pagename参数列表数据
      },

      /**
       * methed:initPower
       * @msg: 获取权限信息 获取初始化页面信息
       */
      initPower() {
        if (this.$store.getters.getuserPower.mp == '0') {
          newmessageBox('您没有小程序管理权限', () => {
            location.href
              = 'http://ssa'
              + getEnv()
              + '.cnsuning.com/ssa-config-web/ssa2-tools/page/siteManager.html'
          })
        } else {
          if (localStorage.settingMiniData) {
            // 有网站信息
            this.miniData = JSON.parse(localStorage.settingMiniData)
            this.getAuthorityInfo()
            this._getProductLineList('false')
            this._getBaseInfo()
            this.name = this.$store.getters.getUserInfo.userName // 张三
            this.jobNumber = this.$store.getters.getUserInfo.userId // 17061616
            this.loginName = this.jobNumber + ':' + this.name // 17061616：张三
            this.modelForm.updateUser = this.loginName
          }
        }
      }
    },
    created() {
      this.tipClass = new selfDefineTooltips()
      this.tipClass.initToolTip()
    },
    beforeDestroy() {
      this.tipClass && this.tipClass.removeTipAndEvent()
    },
    mounted() {
      // 页面访问埋点
      saPageViewInit()
      this.initPower()
    }
  }
</script>

<style lang="scss">
  .minipage-config {
    .pageConfigForm {
      display: flex;
      justify-content: flex-end;
    }

    .controlWidth {
      width: 160px;
    }

    .table-head {
      /*font-size: 14px !important*/
    }

    img.pagenameParams {
      cursor: pointer;
    }

    .miniPagination {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }

    /*.cellEllipsis {*/
    /*  overflow: hidden;*/
    /*  text-overflow: ellipsis;*/
    /*  white-space: nowrap;*/
    /*}*/

    .delBtn {
      width: 80px;
    }
  }

  .popTitle {
    color: #333;
    margin-bottom: 10px;
    display: inline-block;
  }

  .popFooter {
    color: #333;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .page-config-dial .el-select {
    width: 100%;
  }

  .page-config-diar .el-input-group__prepend {
    padding: 0 5px
  }

  .page-config-diar .el-select {
    width: 100%;
  }

  .minipage-config .el-form-item__label {
    font-size: 12px;
  }

  .minipage-config .el-dialog__wrapper {
    overflow: auto;
  }

  .page-config-dial {
    width: 49%;
    display: inline-block;
  }

  .page-config-diar {
    width: 49%;
    display: inline-block;
  }

  .page-config-dial .el-select {
    width: 100%;
  }

  .page-config-diar .el-select {
    width: 100%;
  }

  .page-config-dialog .el-dialog {
    width: 70%;
  }

  .minipage-config table th.must div:before {
    content: "*";
    color: #ff1818;
  }

  .page-config-key .page-config-keytitle:before {
    content: "*";
    color: #ff1818;
  }

  .cellEllipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pageConfigPopover {
    background: #303133;
    color: #fff;
    border-radius: 4px;
    padding: 10px;
    z-index: 2000;
    font-size: 12px;
    line-height: 1.2;
    border-color: #303133;
    text-align: center;
  }

  .pageConfigPopover[x-placement^="top"] .popper__arrow {
    border-top-color: #303133;
  }

  .pageConfigPopover[x-placement^="top"] .popper__arrow::after {
    border-top-color: #303133;
  }

  .page-config-key .el-form-item__content {
    margin-left: 0 !important;
  }

  .el-table--border th.gutter:last-of-type {
    background-color: #61c99e !important;
  }
</style>
